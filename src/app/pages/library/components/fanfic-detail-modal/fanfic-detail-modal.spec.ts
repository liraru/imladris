import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FanficDetailModal } from './fanfic-detail-modal';

describe('FanficDetailModal', () => {
  let component: FanficDetailModal;
  let fixture: ComponentFixture<FanficDetailModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FanficDetailModal],
    }).compileComponents();

    fixture = TestBed.createComponent(FanficDetailModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
