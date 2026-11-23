import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { DatePipe, DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { firstValueFrom } from 'rxjs';
import { YearlyReadingsSearch } from './components/yearly-readings-search/yearly-readings-search';
import {
  YearlyReadingsFormModal,
  YearlyReadingsFormModalData,
} from './components/yearly-readings-form-modal/yearly-readings-form-modal';
import {
  ReadingDetailModal,
  ReadingDetailModalData,
  ReadingDetailModalResult,
} from './components/reading-detail-modal/reading-detail-modal';
import {
  ReadingProgressHistoryModal,
  ReadingProgressHistoryModalData,
} from './components/reading-progress-history-modal/reading-progress-history-modal';
import { AuthService } from '../../services/auth.service';
import { YearlyReadingService } from '../../services/yearly-reading.service';
import { ReadingProgressService } from '../../services/reading-progress.service';
import { YearlyReading } from '@shared/models';
import { ThousandsPipe } from '../../shared/pipes/thousands.pipe';
import { ReadingProgressBar } from '../../shared/components/reading-progress-bar/reading-progress-bar';
import {
  ReadingProgressFormModal,
  ReadingProgressFormModalData,
} from '../../shared/components/reading-progress-form-modal/reading-progress-form-modal';

/** Color de fondo de la imagen exportada. */
const CAPTURE_BACKGROUND = '#17171f';

/** Escala preferida de la imagen exportada (nitidez). */
const PREFERRED_SCALE = 2;
/** Escala mínima por debajo de la cual no se reintenta. */
const MIN_SCALE = 0.5;

/**
 * Límites del lienzo (canvas). En táctil son conservadores: Safari iOS admite ~16,7 M px y las
 * GPU móviles suelen limitar a 4096-8192 px por lado; si se superan, `html2canvas` falla o
 * `toBlob` devuelve `null` sin avisar. En escritorio el límite es muy holgado.
 */
const MAX_CANVAS_PIXELS_TOUCH = 16_000_000;
const MAX_CANVAS_PIXELS_DESKTOP = 120_000_000;
const MAX_CANVAS_SIDE = 8_192;

/** Tiempo que se mantiene viva la URL del blob tras lanzar la descarga (revocarla antes la cancela en móvil). */
const BLOB_URL_LIFETIME_MS = 60_000;

@Component({
  imports: [
    YearlyReadingsSearch,
    DatePipe,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    ThousandsPipe,
    ReadingProgressBar,
  ],
  selector: 'app-yearly-readings',
  styleUrl: './yearly-readings.css',
  templateUrl: './yearly-readings.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearlyReadings implements OnInit {
  private readonly _service = inject(YearlyReadingService);
  private readonly _readingProgressSrv = inject(ReadingProgressService);
  private readonly _dialog = inject(MatDialog);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _document = inject(DOCUMENT);

  protected readonly authService = inject(AuthService);

  protected readonly selectedYear = signal<number>(new Date().getFullYear());
  protected readonly readings = signal<YearlyReading[]>([]);
  protected readonly availableYears = signal<number[]>([]);
  protected readonly loading = signal<boolean>(true);

  /** Último porcentaje de avance registrado para cada lectura del año visible, por id. */
  protected readonly progressByReadingId = signal<Record<number, number>>({});

  protected readonly captureArea = viewChild<ElementRef<HTMLElement>>('captureArea');
  protected readonly capturing = signal<boolean>(false);
  protected readonly showCaptureHeader = signal<boolean>(false);

  protected readonly totalPages = computed(() =>
    this.readings().reduce((sum, r) => sum + (r.pages ?? 0), 0),
  );

  async ngOnInit(): Promise<void> {
    await this.loadAvailableYears();
    await this.loadReadings(this.selectedYear());
  }

  protected async onYearChange(year: number): Promise<void> {
    if (year === this.selectedYear()) return;
    this.selectedYear.set(year);
    await this.loadReadings(year);
  }

  protected async openCreateModal(): Promise<void> {
    if (!this.authService.isAdmin()) return;

    const ref = this._dialog.open(YearlyReadingsFormModal, {
      width: '560px',
      disableClose: true,
      data: { year: this.selectedYear() } satisfies YearlyReadingsFormModalData,
    });
    const created = await firstValueFrom(ref.afterClosed());
    if (created) {
      await this.loadAvailableYears();
      await this.loadReadings(this.selectedYear());
    }
  }

  protected async openEditModal(reading: YearlyReading): Promise<void> {
    if (!this.authService.isAdmin()) return;

    const ref = this._dialog.open(YearlyReadingsFormModal, {
      width: '560px',
      disableClose: true,
      data: { year: this.selectedYear(), reading } satisfies YearlyReadingsFormModalData,
    });
    const updated = await firstValueFrom(ref.afterClosed());
    if (updated) await this.loadReadings(this.selectedYear());
  }

  /** Se abre al clicar la tarjeta o desde "Ver detalle" del menú; "Editar" dentro de la ficha reenvía a la edición. */
  protected async openDetailModal(reading: YearlyReading): Promise<void> {
    const ref = this._dialog.open<
      ReadingDetailModal,
      ReadingDetailModalData,
      ReadingDetailModalResult
    >(ReadingDetailModal, { width: '640px', maxWidth: '95vw', data: { reading } });
    const result = await firstValueFrom(ref.afterClosed());
    if (result?.edit) await this.openEditModal(reading);
  }

  protected async openHistoryModal(reading: YearlyReading): Promise<void> {
    const ref = this._dialog.open(ReadingProgressHistoryModal, {
      width: '640px',
      maxWidth: '95vw',
      data: { reading } satisfies ReadingProgressHistoryModalData,
    });
    await firstValueFrom(ref.afterClosed());
    // Desde el histórico se puede registrar un avance y marcar la lectura como completada.
    await this._refreshReadings();
  }

  protected async registerProgress(reading: YearlyReading): Promise<void> {
    if (!this.authService.isAdmin()) return;

    const ref = this._dialog.open(ReadingProgressFormModal, {
      width: '480px',
      disableClose: true,
      data: { reading } satisfies ReadingProgressFormModalData,
    });
    const saved = await firstValueFrom(ref.afterClosed());
    // Se recargan las lecturas (y no solo el avance): al marcar como completada cambia su fecha de fin.
    if (saved) await this._refreshReadings();
  }

  protected async deleteReading(reading: YearlyReading): Promise<void> {
    if (!this.authService.isAdmin()) return;
    if (!confirm(`¿Eliminar "${reading.title}" del historial?`)) return;
    await this._service.remove(reading.id);
    await this.loadReadings(this.selectedYear());
  }

  protected async downloadYearImage(): Promise<void> {
    if (!this.authService.isAdmin() || this.capturing()) return;

    const element = this.captureArea()?.nativeElement;
    if (!element) return;

    this.capturing.set(true);
    this.showCaptureHeader.set(true);

    try {
      await this._waitForLayout();

      const filename = `imladris-lecturas-${this.selectedYear()}.png`;
      const blob = await this._renderToBlob(element);

      this._saveBlob(blob, filename);
      this._offerShare(new File([blob], filename, { type: 'image/png' }));
    } catch (err) {
      console.error('Error generando la imagen del año', err);
      this._snackBar.open('No se pudo generar la imagen del año.', 'Cerrar', { duration: 6000 });
    } finally {
      this.showCaptureHeader.set(false);
      this.capturing.set(false);
    }
  }

  /** Espera a que el modo captura (cabecera visible, 7 columnas) esté aplicado y pintado. */
  private async _waitForLayout(): Promise<void> {
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );
    await new Promise<void>((resolve) => setTimeout(resolve, 50));
  }

  private _isTouchDevice(): boolean {
    return this._document.defaultView?.matchMedia('(pointer: coarse)').matches ?? false;
  }

  /**
   * Renderiza el área de captura a PNG. La escala se limita según el tamaño real del lienzo para no
   * superar los máximos del navegador (sobre todo en móvil); si aun así falla, se reintenta con una
   * escala menor en vez de terminar en silencio.
   *
   * Se usa `html2canvas-pro` (fork con la misma API) porque `html2canvas` 1.4 no soporta las
   * funciones de color modernas (`color()`, `color-mix()`, `oklch()`…) que usa el tema.
   */
  private async _renderToBlob(element: HTMLElement): Promise<Blob> {
    const { default: html2canvas } = await import('html2canvas-pro');

    const width = Math.max(1, Math.ceil(element.scrollWidth));
    const height = Math.max(1, Math.ceil(element.scrollHeight));
    const maxPixels = this._isTouchDevice() ? MAX_CANVAS_PIXELS_TOUCH : MAX_CANVAS_PIXELS_DESKTOP;

    const safeScale = Math.min(
      PREFERRED_SCALE,
      Math.sqrt(maxPixels / (width * height)),
      MAX_CANVAS_SIDE / Math.max(width, height),
    );
    let scale = Math.max(MIN_SCALE, Math.floor(safeScale * 100) / 100);

    let lastError: unknown = new Error('No se pudo generar la imagen');

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const canvas = await html2canvas(element, {
          backgroundColor: CAPTURE_BACKGROUND,
          scale,
          useCORS: true,
          windowWidth: Math.max(width + 100, 1440),
          windowHeight: Math.max(height + 200, 900),
        });

        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve, 'image/png'),
        );
        // Libera la memoria del lienzo cuanto antes (importante en móvil).
        canvas.width = 0;
        canvas.height = 0;

        if (blob) return blob;
        lastError = new Error('El navegador no pudo codificar la imagen (lienzo demasiado grande)');
      } catch (err) {
        lastError = err;
      }

      if (scale <= MIN_SCALE) break;
      scale = Math.max(MIN_SCALE, scale * 0.6);
    }

    throw lastError;
  }

  /**
   * Lanza la descarga. El enlace se añade al DOM y la URL del blob no se revoca de inmediato:
   * en varios navegadores móviles, revocarla justo después de `click()` cancela la descarga.
   */
  private _saveBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = this._document.createElement('a');
    link.href = url;
    link.download = filename;
    link.rel = 'noopener';
    link.style.display = 'none';
    this._document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), BLOB_URL_LIFETIME_MS);
  }

  /**
   * En táctil, ofrece compartir la imagen con la hoja nativa del sistema (permite guardarla en la
   * galería o en archivos). Es la alternativa fiable si el navegador o la app instalada no permiten
   * la descarga directa; se ejecuta desde un toque nuevo del usuario, como exige la Web Share API.
   */
  private _offerShare(file: File): void {
    const canShare =
      this._isTouchDevice() &&
      typeof navigator.canShare === 'function' &&
      typeof navigator.share === 'function' &&
      navigator.canShare({ files: [file] });

    if (!canShare) return;

    this._snackBar
      .open('Imagen generada.', 'Compartir', { duration: 10_000 })
      .onAction()
      .subscribe(() => void this._shareFile(file));
  }

  private async _shareFile(file: File): Promise<void> {
    try {
      await navigator.share({ files: [file], title: file.name });
    } catch (err) {
      // AbortError: el usuario cerró la hoja de compartir; no es un fallo.
      if ((err as DOMException)?.name === 'AbortError') return;
      console.error('Error compartiendo la imagen del año', err);
      this._snackBar.open('No se pudo compartir la imagen.', 'Cerrar', { duration: 6000 });
    }
  }

  private async loadReadings(year: number): Promise<void> {
    this.loading.set(true);
    try {
      this.readings.set(await this._service.getByYear(year));
      await this._loadProgress();
    } finally {
      this.loading.set(false);
    }
  }

  /** Recarga las lecturas del año visible y su avance sin pasar por el estado de carga (sin spinner). */
  private async _refreshReadings(): Promise<void> {
    try {
      this.readings.set(await this._service.getByYear(this.selectedYear()));
      await this._loadProgress();
    } catch (err) {
      console.error(err);
    }
  }

  private async loadAvailableYears(): Promise<void> {
    const all = await this._service.getAll();
    const years = Array.from(new Set(all.map((r) => r.year))).sort((a, b) => b - a);
    if (years.length) {
      this.availableYears.set(years);
      if (!years.includes(this.selectedYear())) this.selectedYear.set(years[0]);
    } else {
      this.availableYears.set([this.selectedYear()]);
    }
  }

  /** Último porcentaje de avance de cada lectura del año visible, para la barra de progreso. */
  private async _loadProgress(): Promise<void> {
    const ids = this.readings().map((r) => r.id);
    this.progressByReadingId.set(
      ids.length ? await this._readingProgressSrv.getLatestPercentages(ids) : {},
    );
  }
}
