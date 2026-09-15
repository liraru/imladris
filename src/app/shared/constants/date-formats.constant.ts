import { MatDateFormats } from '@angular/material/core';

/**
 * Formato de fecha único para toda la aplicación: dd/MM/yyyy en los `mat-datepicker`,
 * con ceros a la izquierda, independientemente del idioma del navegador.
 * Las fechas se siguen guardando como `yyyy-MM-dd` en Supabase; esto solo afecta
 * a cómo se muestran. Los textos de solo lectura usan `DatePipe` con el mismo formato.
 */
export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { day: '2-digit', month: '2-digit', year: 'numeric' },
  },
  display: {
    dateInput: { day: '2-digit', month: '2-digit', year: 'numeric' },
    monthYearLabel: { month: 'short', year: 'numeric' },
    dateA11yLabel: { day: '2-digit', month: '2-digit', year: 'numeric' },
    monthYearA11yLabel: { month: 'long', year: 'numeric' },
  },
};
