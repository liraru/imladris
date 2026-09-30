import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadingDailyChart } from './reading-daily-chart';

describe('ReadingDailyChart', () => {
  let component: ReadingDailyChart;
  let fixture: ComponentFixture<ReadingDailyChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingDailyChart],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingDailyChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
