export interface YearlyReading {
  id: number;
  year: number;
  title: string;
  authors: string[];
  pages: number;
  startDate: string;  // yyyy-MM-dd
  endDate: string;  // yyyy-MM-dd
  coverUrl: string;
}
