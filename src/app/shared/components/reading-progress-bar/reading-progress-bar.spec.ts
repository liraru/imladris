import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadingProgressBar } from './reading-progress-bar';

describe('ReadingProgressBar', () => {
  let component: ReadingProgressBar;
  let fixture: ComponentFixture<ReadingProgressBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingProgressBar],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingProgressBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
