import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YearlyReadingsFormModal } from './yearly-readings-form-modal';

describe('YearlyReadingsFormModal', () => {
  let component: YearlyReadingsFormModal;
  let fixture: ComponentFixture<YearlyReadingsFormModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearlyReadingsFormModal],
    }).compileComponents();

    fixture = TestBed.createComponent(YearlyReadingsFormModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
