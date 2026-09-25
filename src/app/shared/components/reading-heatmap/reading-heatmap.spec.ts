import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadingHeatmap } from './reading-heatmap';

describe('ReadingHeatmap', () => {
  let component: ReadingHeatmap;
  let fixture: ComponentFixture<ReadingHeatmap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingHeatmap],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingHeatmap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
