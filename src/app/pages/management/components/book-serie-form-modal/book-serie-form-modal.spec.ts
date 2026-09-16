import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookSerieFormModal } from './book-serie-form-modal';

describe('BookSerieFormModal', () => {
  let component: BookSerieFormModal;
  let fixture: ComponentFixture<BookSerieFormModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookSerieFormModal],
    }).compileComponents();

    fixture = TestBed.createComponent(BookSerieFormModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
