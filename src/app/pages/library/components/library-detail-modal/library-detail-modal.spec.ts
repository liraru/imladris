import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryDetailModal } from './library-detail-modal';

describe('LibraryDetailModal', () => {
  let component: LibraryDetailModal;
  let fixture: ComponentFixture<LibraryDetailModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryDetailModal],
    }).compileComponents();

    fixture = TestBed.createComponent(LibraryDetailModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
