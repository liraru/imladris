import { DOCUMENT } from '@angular/common';
import { Directive, inject, input, OnDestroy } from '@angular/core';

/**
 * Muestra la portada ampliada (overlay a pantalla completa) mientras el ratón está sobre la
 * imagen en la que se aplica. Mismo comportamiento visual que la previsualización de Plan de
 * lectura. El overlay se añade a <body> y sus estilos son globales (`.cover-hover-preview`,
 * definidos en `src/styles/_library-card.scss`).
 *
 * Solo actúa en dispositivos con hover real: en táctil, el `mouseenter` emulado dejaría el
 * overlay pegado en pantalla.
 *
 * Uso: <img [src]="url" [appCoverPreview]="url" [coverPreviewAlt]="'Portada de ' + title" />
 */
@Directive({
  selector: 'img[appCoverPreview]',
  host: {
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
    '(click)': 'hide()',
  },
})
export class CoverPreviewDirective implements OnDestroy {
  public readonly appCoverPreview = input<string | undefined>();
  public readonly coverPreviewAlt = input<string>('Portada ampliada');

  private readonly _document = inject(DOCUMENT);
  private _overlay: HTMLElement | null = null;

  show(): void {
    const url = this.appCoverPreview();
    if (!url || this._overlay) return;
    if (!this._document.defaultView?.matchMedia('(hover: hover)').matches) return;

    const overlay = this._document.createElement('div');
    overlay.className = 'cover-hover-preview';

    const image = this._document.createElement('img');
    image.className = 'cover-hover-preview__image';
    image.src = url;
    image.alt = this.coverPreviewAlt();

    overlay.appendChild(image);
    this._document.body.appendChild(overlay);
    this._overlay = overlay;
  }

  hide(): void {
    this._overlay?.remove();
    this._overlay = null;
  }

  ngOnDestroy(): void {
    this.hide();
  }
}
