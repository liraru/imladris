import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorialFormModal } from './editorial-form-modal';

describe('EditorialFormModal', () => {
  let component: EditorialFormModal;
  let fixture: ComponentFixture<EditorialFormModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorialFormModal],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorialFormModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
