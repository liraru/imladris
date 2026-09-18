import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadingPlan } from './reading-plan';

describe('ReadingPlan', () => {
  let component: ReadingPlan;
  let fixture: ComponentFixture<ReadingPlan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingPlan],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingPlan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
