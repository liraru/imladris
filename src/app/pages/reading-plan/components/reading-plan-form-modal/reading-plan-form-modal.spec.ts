import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadingPlanFormModal } from './reading-plan-form-modal';

describe('ReadingPlanFormModal', () => {
  let component: ReadingPlanFormModal;
  let fixture: ComponentFixture<ReadingPlanFormModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingPlanFormModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingPlanFormModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
