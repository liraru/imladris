import { Injectable, computed, signal } from '@angular/core';

/** Evento no estándar que Chromium (Chrome/Edge) lanza cuando la app se puede instalar. */
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

/**
 * Gestiona la instalación de la PWA.
 *
 * El navegador lanza `beforeinstallprompt` una sola vez y muy pronto (antes de que se cargue
 * la página de gestión, que es lazy), por eso el servicio se instancia al arrancar la app
 * (ver `provideAppInitializer` en `app.config.ts`) y guarda el evento hasta que se necesite.
 */
@Injectable({ providedIn: 'root' })
export class PwaInstallService {
  private readonly _deferredPrompt = signal<BeforeInstallPromptEvent | null>(null);
  private readonly _installed = signal(this._isStandalone());

  /** `true` si el navegador permite instalar la app y aún no está instalada/abierta como app. */
  readonly canInstall = computed(() => !this._installed() && this._deferredPrompt() !== null);

  constructor() {
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      // Evita la mini-barra automática del navegador: la instalación se lanza desde Gestión.
      event.preventDefault();
      this._deferredPrompt.set(event as BeforeInstallPromptEvent);
    });

    window.addEventListener('appinstalled', () => {
      this._installed.set(true);
      this._deferredPrompt.set(null);
    });
  }

  /** Muestra el diálogo nativo de instalación. El evento solo se puede usar una vez. */
  async install(): Promise<void> {
    const promptEvent = this._deferredPrompt();
    if (!promptEvent) return;

    try {
      await promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      if (outcome === 'accepted') this._installed.set(true);
    } catch (e) {
      console.error('No se pudo iniciar la instalación de la aplicación:', e);
    } finally {
      this._deferredPrompt.set(null);
    }
  }

  /** `true` si la app ya se está ejecutando como aplicación instalada (ventana propia). */
  private _isStandalone(): boolean {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true
    );
  }
}
