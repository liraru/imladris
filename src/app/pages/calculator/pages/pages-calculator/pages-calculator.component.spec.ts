import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesCalculatorComponent } from './pages-calculator.component';

describe('PagesCalculatorComponent', () => {
  let component: PagesCalculatorComponent;
  let fixture: ComponentFixture<PagesCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesCalculatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PagesCalculatorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
