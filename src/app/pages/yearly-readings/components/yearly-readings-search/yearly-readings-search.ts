import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatIconModule],
  selector: 'app-yearly-readings-search',
  styleUrl: './yearly-readings-search.css',
  templateUrl: './yearly-readings-search.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearlyReadingsSearch {
  readonly years = input<number[]>([]);
  readonly selectedYear = input<number | null>(null);
  readonly yearChange = output<number>();

  protected readonly control = new FormControl<string>('', { nonNullable: true });
  protected readonly filteredYears = signal<number[]>([]);

  constructor() {
    effect(() => {
      const year = this.selectedYear();
      if (year != null) {
        this.control.setValue(String(year), { emitEvent: false });
      }
    });

    effect(() => {
      // se recalcula cada vez que cambia la lista de años disponibles
      this.filteredYears.set(this._filter(this.control.value, this.years()));
    });

    this.control.valueChanges.subscribe((value) => {
      this.filteredYears.set(this._filter(value, this.years()));
    });
  }

  protected onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const year = Number(event.option.value);
    if (!Number.isNaN(year)) this.yearChange.emit(year);
  }

  protected onEnter(): void {
    const year = Number(this.control.value);
    if (!Number.isNaN(year) && year > 1900 && year < 3000) {
      this.yearChange.emit(year);
    }
  }

  private _filter(value: string, years: number[]): number[] {
    const term = (value ?? '').trim();
    if (!term) return years;
    return years.filter((y) => String(y).includes(term));
  }
}
