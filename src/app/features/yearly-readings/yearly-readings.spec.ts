import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YearlyReadings } from './yearly-readings';

describe('YearlyReadings', () => {
  let component: YearlyReadings;
  let fixture: ComponentFixture<YearlyReadings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearlyReadings],
    }).compileComponents();

    fixture = TestBed.createComponent(YearlyReadings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
