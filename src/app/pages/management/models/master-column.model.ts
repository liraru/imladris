export interface MasterColumn<T> {
  /** Debe coincidir con el key usado internamente para la columna de la tabla. */
  key: string;
  header: string;
  /** Valor a mostrar (y por el que se filtra) para un registro dado. */
  value: (item: T) => string;
}
