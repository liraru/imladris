import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorFormModal } from './author-form-modal';

describe('AuthorFormModal', () => {
  let component: AuthorFormModal;
  let fixture: ComponentFixture<AuthorFormModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorFormModal],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorFormModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
