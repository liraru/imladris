import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesCalculator } from './pages-calculator';

describe('PagesCalculator', () => {
  let component: PagesCalculator;
  let fixture: ComponentFixture<PagesCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesCalculator],
    }).compileComponents();

    fixture = TestBed.createComponent(PagesCalculator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
