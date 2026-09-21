import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipFormModal } from './ship-form-modal';

describe('ShipFormModal', () => {
  let component: ShipFormModal;
  let fixture: ComponentFixture<ShipFormModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipFormModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ShipFormModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
