import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadingProgressFormModal } from './reading-progress-form-modal';

describe('ReadingProgressFormModal', () => {
  let component: ReadingProgressFormModal;
  let fixture: ComponentFixture<ReadingProgressFormModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingProgressFormModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingProgressFormModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
