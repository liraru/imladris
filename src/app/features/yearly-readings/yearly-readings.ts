import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-yearly-readings',
  styleUrl: './yearly-readings.css',
  templateUrl: './yearly-readings.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearlyReadings {}
