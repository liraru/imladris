export enum MANAGEMENT_MASTER {
  AUTHORS = 1,
  EDITORIALS,
  BOOK_SERIES,
  MANGAS,
  FANDOMS,
  SHIPS,
}

export interface ManagementMenuEntry {
  master: MANAGEMENT_MASTER;
  label: string;
  icon: string;
}

export const MANAGEMENT_MENU_ENTRIES: ManagementMenuEntry[] = [
  { master: MANAGEMENT_MASTER.AUTHORS, label: 'Autores', icon: 'person' },
  { master: MANAGEMENT_MASTER.EDITORIALS, label: 'Editoriales', icon: 'domain' },
  { master: MANAGEMENT_MASTER.BOOK_SERIES, label: 'Series', icon: 'collections_bookmark' },
  { master: MANAGEMENT_MASTER.MANGAS, label: 'Mangas', icon: 'auto_stories' },
  { master: MANAGEMENT_MASTER.FANDOMS, label: 'Fandoms', icon: 'theater_comedy' },
  { master: MANAGEMENT_MASTER.SHIPS, label: 'Ships', icon: 'favorite' },
];
