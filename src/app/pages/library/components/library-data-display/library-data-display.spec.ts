import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryDataDisplay } from './library-data-display';

describe('LibraryDataDisplay', () => {
  let component: LibraryDataDisplay;
  let fixture: ComponentFixture<LibraryDataDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryDataDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(LibraryDataDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
