export enum FORM_MODE {
  ALTA = 1,
  DETALLE,
  EDICION,
}

export const FORM_MODE_LABELS: Record<FORM_MODE, string> = {
  [FORM_MODE.ALTA]: 'Añadir',
  [FORM_MODE.DETALLE]: 'Detalle',
  [FORM_MODE.EDICION]: 'Editar',
};
