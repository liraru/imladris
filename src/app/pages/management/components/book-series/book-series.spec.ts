import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookSeries } from './book-series';

describe('BookSeries', () => {
  let component: BookSeries;
  let fixture: ComponentFixture<BookSeries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookSeries],
    }).compileComponents();

    fixture = TestBed.createComponent(BookSeries);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
