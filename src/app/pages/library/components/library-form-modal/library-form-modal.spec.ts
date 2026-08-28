import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryFormModal } from './library-form-modal';

describe('LibraryFormModal', () => {
  let component: LibraryFormModal;
  let fixture: ComponentFixture<LibraryFormModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryFormModal],
    }).compileComponents();

    fixture = TestBed.createComponent(LibraryFormModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
