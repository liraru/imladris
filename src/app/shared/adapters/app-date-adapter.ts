import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

/**
 * Adaptador de fechas que corrige el parseo manual en los `mat-datepicker`.
 * `NativeDateAdapter` ignora el `parseFormat` definido en `MAT_DATE_FORMATS`
 * y delega en `Date.parse()`, que interpreta las cadenas con formato
 * MM/dd/yyyy independientemente del locale configurado. Este adaptador
 * parsea explícitamente el formato dd/MM/yyyy (o dd-MM-yyyy) usado en toda
 * la aplicación.
 */
@Injectable()
export class AppDateAdapter extends NativeDateAdapter {
  override parse(value: unknown): Date | null {
    if (typeof value === 'string' && value.trim().length > 0) {
      const match = value.trim().match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
      if (!match) {
        return null;
      }

      const day = Number(match[1]);
      const month = Number(match[2]) - 1;
      const year = Number(match[3]);
      const date = new Date(year, month, day);

      // Descarta fechas inválidas que JS "redondea" (ej. 31/02/2026 -> 03/03/2026)
      if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
        return null;
      }

      return date;
    }

    return value instanceof Date ? value : null;
  }
}
