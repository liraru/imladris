import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formatea un número entero con separador de miles en formato español (punto),
 * p.ej. 120000 -> "120.000".
 *
 * No usa `Intl`/`toLocaleString`: algunos navegadores (sobre todo builds de
 * Chromium recortadas en Linux) no traen los datos de localización de 'es-ES'
 * cargados y `toLocaleString` falla en silencio, devolviendo el número sin
 * agrupar en vez de lanzar un error. El formateo manual con regex es
 * independiente del entorno y siempre da el mismo resultado.
 *
 * También fuerza el valor a Number antes de formatear: algunas columnas de
 * Supabase (bigint/numeric) llegan como string aunque el tipo TS declare
 * `number`.
 */
@Pipe({
  name: 'thousands',
  standalone: true,
})
export class ThousandsPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    if (value == null || value === '') return '';
    const num = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(num)) return '';

    const isNegative = num < 0;
    const [integerPart, decimalPart] = Math.abs(num).toString().split('.');
    const withThousands = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return (isNegative ? '-' : '') + withThousands + (decimalPart ? ',' + decimalPart : '');
  }
}
