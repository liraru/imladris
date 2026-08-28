import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorialModal } from './editorial-modal';

describe('EditorialModal', () => {
  let component: EditorialModal;
  let fixture: ComponentFixture<EditorialModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorialModal],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorialModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
