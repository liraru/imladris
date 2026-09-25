import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadingDetailModal } from './reading-detail-modal';

describe('ReadingDetailModal', () => {
  let component: ReadingDetailModal;
  let fixture: ComponentFixture<ReadingDetailModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingDetailModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingDetailModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
