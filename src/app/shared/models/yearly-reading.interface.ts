export interface YearlyReading {
  id: number;
  year: number;
  title: string;
  authors: string[];
  pages: number;
  startDate: string; // yyyy-MM-dd
  endDate: string | null; // yyyy-MM-dd — null = todavía en lectura
  coverUrl: string;
}
