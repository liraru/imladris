import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FanficFormModal } from './fanfic-form-modal';

describe('FanficFormModal', () => {
  let component: FanficFormModal;
  let fixture: ComponentFixture<FanficFormModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FanficFormModal],
    }).compileComponents();

    fixture = TestBed.createComponent(FanficFormModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
