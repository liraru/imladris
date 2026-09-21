import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FandomFormModal } from './fandom-form-modal';

describe('FandomFormModal', () => {
  let component: FandomFormModal;
  let fixture: ComponentFixture<FandomFormModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FandomFormModal],
    }).compileComponents();

    fixture = TestBed.createComponent(FandomFormModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
