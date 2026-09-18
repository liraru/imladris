import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendToYearlyReadingModal } from './send-to-yearly-reading-modal';

describe('SendToYearlyReadingModal', () => {
  let component: SendToYearlyReadingModal;
  let fixture: ComponentFixture<SendToYearlyReadingModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendToYearlyReadingModal],
    }).compileComponents();

    fixture = TestBed.createComponent(SendToYearlyReadingModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
