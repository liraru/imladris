import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReadingPlanItem } from '@shared/models';
import { YearlyReadingService } from '../../../../services/yearly-reading.service';
import { ReadingPlanService } from '../../../../services/reading-plan.service';
import { dateRangeValidator } from '../../../../shared/validators/date-range.validator';

export interface SendToYearlyReadingModalData {
  item: ReadingPlanItem;
}

@Component({
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  selector: 'app-send-to-yearly-reading-modal',
  styleUrl: './send-to-yearly-reading-modal.css',
  templateUrl: './send-to-yearly-reading-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendToYearlyReadingModal {
  private readonly _fb = inject(FormBuilder);
  private readonly _dialogRef = inject(MatDialogRef<SendToYearlyReadingModal>);
  private readonly _yearlyReadingService = inject(YearlyReadingService);
  private readonly _readingPlanService = inject(ReadingPlanService);
  protected readonly data = inject<SendToYearlyReadingModalData>(MAT_DIALOG_DATA);

  protected readonly saving = signal(false);

  protected readonly form = this._fb.nonNullable.group(
    {
      startDate: [new Date(), Validators.required],
      endDate: [null as Date | null],
    },
    { validators: dateRangeValidator('startDate', 'endDate') },
  );

  protected async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const startDate = this._toDateString(raw.startDate)!;
    const endDate = this._toDateString(raw.endDate);

    this.saving.set(true);
    try {
      await this._yearlyReadingService.create({
        year: raw.startDate.getFullYear(),
        title: this.data.item.title,
        authors: this.data.item.authors,
        pages: this.data.item.pages,
        startDate,
        endDate,
        coverUrl: this.data.item.coverUrl,
      });
      await this._readingPlanService.remove(this.data.item.id);
      this._dialogRef.close(true);
    } finally {
      this.saving.set(false);
    }
  }

  protected cancel(): void {
    this._dialogRef.close(false);
  }

  private _toDateString(date: Date | null): string | null {
    if (!date) return null;
    const d = new Date(date);
    const offset = d.getTimezoneOffset();
    const local = new Date(d.getTime() - offset * 60_000);
    return local.toISOString().slice(0, 10);
  }
}
