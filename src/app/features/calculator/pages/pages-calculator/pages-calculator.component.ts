import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { firstValueFrom } from 'rxjs';
import { CalculatorConfirmDialogData, CalculatorConfirmDialogComponent } from '../../components/calculator-confirm-dialog/calculator-confirm-dialog.component';

interface HistoryEntry {
  detail: string;
  time: string;
}

interface FolioState {
  totalPages: number | null;
  totalPosition: number | null;
  history: HistoryEntry[];
}

const STORAGE_KEY = 'folio:kindle-data';

const DEFAULT_STATE: FolioState = {
  totalPages: null,
  totalPosition: null,
  history: [],
};

@Component({
  selector: 'app-pages-calculator',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
  ],
  templateUrl: './pages-calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesCalculatorComponent {
  private readonly dialog = inject(MatDialog);

  // --- Bloque I: páginas totales ---
  palabras = signal<number | null>(null);
  capitulos = signal<number | null>(null);
  resultPaginasValue = signal<number | null>(null);
  errorPaginas = signal<string | null>(null);

  // --- Bloque II: página actual ---
  posicionActual = signal<number | null>(null);
  posicionTotal = signal<number | null>(null);
  paginasTotalesStored = signal<number | null>(null);
  resultPagina = signal<{ pagina: number; sub: string } | null>(null);
  errorPagina = signal<string | null>(null);

  // --- Historial ---
  history = signal<HistoryEntry[]>([]);

  constructor() {
    this.loadState();
  }

  // ---------- Persistencia ----------

  private loadState(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<FolioState>;
        const state: FolioState = { ...DEFAULT_STATE, ...parsed };
        this.posicionTotal.set(state.totalPosition);
        this.paginasTotalesStored.set(state.totalPages);
        this.history.set(state.history ?? []);
      }
    } catch (e) {
      console.warn('No se pudo leer el almacenamiento local:', e);
    }
  }

  private saveState(): void {
    const state: FolioState = {
      totalPages: this.paginasTotalesStored(),
      totalPosition: this.posicionTotal(),
      history: this.history(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('No se pudo guardar el estado:', e);
      this.errorPaginas.set(
        'No se ha podido guardar el dato en este navegador (¿modo incógnito o almacenamiento bloqueado?).',
      );
    }
  }

  // ---------- Utilidades ----------

  fmt(n: number): string {
    return new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(n);
  }

  private addHistory(detail: string): void {
    const time = new Date().toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
    const next = [...this.history(), { detail, time }];
    if (next.length > 40) next.shift();
    this.history.set(next);
  }

  /** Historial en orden de más reciente a más antiguo, para la plantilla. */
  historyReversed(): HistoryEntry[] {
    return [...this.history()].reverse();
  }

  // ---------- Diálogo de confirmación (Angular Material) ----------

  private async showConfirmModal(data: CalculatorConfirmDialogData): Promise<boolean> {
    const dialogRef = this.dialog.open(CalculatorConfirmDialogComponent, { data, autoFocus: 'dialog' });
    const result = await firstValueFrom(dialogRef.afterClosed());
    return result === true;
  }

  // ---------- Bloque I: calcular páginas totales ----------

  async calcularPaginas(): Promise<void> {
    const palabras = this.palabras();
    const capitulos = this.capitulos();
    this.errorPaginas.set(null);

    if (
      palabras == null ||
      !Number.isFinite(palabras) ||
      palabras < 0 ||
      capitulos == null ||
      !Number.isFinite(capitulos) ||
      capitulos < 0
    ) {
      this.errorPaginas.set(
        'Introduce el número de palabras y de capítulos (valores válidos y positivos).',
      );
      return;
    }

    const paginas = Math.ceil(palabras / 300 + capitulos * 0.6);
    this.resultPaginasValue.set(paginas);

    // Verde (terciario): confirmar una acción afirmativa de guardado.
    const persistir = await this.showConfirmModal({
      title: `${this.fmt(paginas)} páginas`,
      message:
        '¿Quieres guardar este valor como páginas totales para usarlo en el cálculo de la página actual? Si no, se queda solo como resultado de esta consulta.',
      confirmText: 'Guardar y usar',
      cancelText: 'Solo ver resultado',
      confirmColor: 'tertiary',
    });

    if (persistir) {
      this.paginasTotalesStored.set(paginas);
      this.saveState();
      this.addHistory(
        `<strong>${this.fmt(paginas)} páginas</strong> · ${this.fmt(palabras)} palabras, ${this.fmt(capitulos)} capítulos <em>(guardado)</em>`,
      );
    } else {
      this.addHistory(
        `${this.fmt(paginas)} páginas · ${this.fmt(palabras)} palabras, ${this.fmt(capitulos)} capítulos <em>(sin guardar)</em>`,
      );
      this.saveState();
    }
  }

  // ---------- Bloque II: calcular página actual ----------

  calcularPaginaActual(): void {
    const posicionActual = this.posicionActual();
    const posicionTotal = this.posicionTotal();
    const paginasTotales = this.paginasTotalesStored();
    this.errorPagina.set(null);

    if (posicionActual == null || !Number.isFinite(posicionActual) || posicionActual < 0) {
      this.errorPagina.set('Introduce tu posición actual del Kindle.');
      return;
    }
    if (
      posicionTotal == null ||
      !Number.isFinite(posicionTotal) ||
      posicionTotal <= 0 ||
      paginasTotales == null ||
      !Number.isFinite(paginasTotales) ||
      paginasTotales <= 0
    ) {
      this.errorPagina.set(
        'Faltan la posición total o las páginas totales. Complétalas (o calcúlalas primero en el bloque I).',
      );
      return;
    }

    const paginaActual = Math.round(posicionActual / (posicionTotal / paginasTotales));
    this.saveState();

    this.resultPagina.set({
      pagina: paginaActual,
      sub: `de ${this.fmt(paginasTotales)} páginas · posición ${this.fmt(posicionActual)} de ${this.fmt(posicionTotal)}`,
    });

    this.addHistory(
      `<strong>Página ${this.fmt(paginaActual)}</strong> de ${this.fmt(paginasTotales)} · pos. ${this.fmt(posicionActual)}/${this.fmt(posicionTotal)}`,
    );
    this.saveState();
  }

  // ---------- Edición manual de valores guardados ----------

  onPosicionTotalChange(): void {
    this.saveState();
  }

  onPaginasTotalesStoredChange(): void {
    this.saveState();
  }

  // ---------- Historial y reinicio ----------

  async vaciarHistorial(): Promise<void> {
    if (!this.history().length) return;
    // Vino (secundario): confirmar una acción destructiva.
    const ok = await this.showConfirmModal({
      title: 'Vaciar historial',
      message: 'Esta acción no se puede deshacer. ¿Seguro que quieres borrar todo el historial?',
      confirmText: 'Vaciar',
      cancelText: 'Cancelar',
      confirmColor: 'secondary',
    });
    if (!ok) return;
    this.history.set([]);
    this.saveState();
  }

  async reiniciar(): Promise<void> {
    const ok = await this.showConfirmModal({
      title: 'Reiniciar valores',
      message: '¿Seguro que quieres reiniciar la posición total y las páginas totales guardadas?',
      confirmText: 'Reiniciar',
      cancelText: 'Cancelar',
      confirmColor: 'secondary',
    });
    if (!ok) return;
    this.posicionTotal.set(null);
    this.paginasTotalesStored.set(null);
    this.saveState();
    this.resultPaginasValue.set(null);
    this.resultPagina.set(null);
  }
}
