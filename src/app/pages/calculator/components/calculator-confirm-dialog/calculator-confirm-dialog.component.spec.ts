import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorConfirmDialogComponent } from './calculator-confirm-dialog.component';

describe('CalculatorConfirmDialog', () => {
  let component: CalculatorConfirmDialogComponent;
  let fixture: ComponentFixture<CalculatorConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorConfirmDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorConfirmDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
