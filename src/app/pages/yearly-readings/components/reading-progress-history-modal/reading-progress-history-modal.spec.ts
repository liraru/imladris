import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadingProgressHistoryModal } from './reading-progress-history-modal';

describe('ReadingProgressHistoryModal', () => {
  let component: ReadingProgressHistoryModal;
  let fixture: ComponentFixture<ReadingProgressHistoryModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingProgressHistoryModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingProgressHistoryModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
