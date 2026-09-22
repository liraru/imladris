import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formatea un número entero con separador de miles en formato español (punto),
 * p.ej. 120000 -> "120.000". No depende del LOCALE_ID configurado en la app.
 */
@Pipe({
  name: 'thousands',
  standalone: true,
})
export class ThousandsPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null) return '';
    return value.toLocaleString('es-ES');
  }
}
