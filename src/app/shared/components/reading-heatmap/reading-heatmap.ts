import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReadingProgressService } from '../../../services/reading-progress.service';

interface HeatmapDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

@Component({
  selector: 'app-reading-heatmap',
  imports: [DatePipe, DecimalPipe, MatProgressSpinnerModule, MatTooltipModule],
  templateUrl: './reading-heatmap.html',
  styleUrl: './reading-heatmap.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadingHeatmap implements OnInit {
  private readonly _service = inject(ReadingProgressService);

  protected readonly loading = signal(true);
  protected readonly weeks = signal<HeatmapDay[][]>([]);
  protected readonly monthLabels = signal<{ label: string; weekIndex: number }[]>([]);
  protected readonly totalPages = signal(0);

  private readonly _monthNames = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];

  async ngOnInit(): Promise<void> {
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - 370); // ~53 semanas
    start.setDate(start.getDate() - start.getDay()); // retrocede al domingo anterior, como GitHub

    const pagesByDay = await this._service.getPagesByDay(this._toDateString(start));

    const days: HeatmapDay[] = [];
    const cursor = new Date(start);
    while (cursor <= today) {
      const dateStr = this._toDateString(cursor);
      const count = pagesByDay[dateStr] ?? 0;
      days.push({ date: dateStr, count, level: this._level(count) });
      cursor.setDate(cursor.getDate() + 1);
    }

    const weeks: HeatmapDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    const monthLabels: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, weekIndex) => {
      const month = new Date(week[0].date).getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ label: this._monthNames[month], weekIndex });
        lastMonth = month;
      }
    });

    this.weeks.set(weeks);
    this.monthLabels.set(monthLabels);
    this.totalPages.set(Object.values(pagesByDay).reduce((s, n) => s + n, 0));
    this.loading.set(false);
  }

  protected dayTooltip(day: HeatmapDay): string {
    return day.count > 0
      ? `${day.count} página${day.count === 1 ? '' : 's'} leída${day.count === 1 ? '' : 's'}`
      : 'Sin páginas leídas';
  }

  private _level(count: number): 0 | 1 | 2 | 3 | 4 {
    if (count <= 0) return 0;
    if (count < 15) return 1;
    if (count < 30) return 2;
    if (count < 60) return 3;
    return 4;
  }

  private _toDateString(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}
