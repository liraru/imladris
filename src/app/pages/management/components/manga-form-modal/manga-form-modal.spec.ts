import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangaFormModal } from './manga-form-modal';

describe('MangaFormModal', () => {
  let component: MangaFormModal;
  let fixture: ComponentFixture<MangaFormModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaFormModal],
    }).compileComponents();

    fixture = TestBed.createComponent(MangaFormModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
