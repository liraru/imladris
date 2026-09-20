import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FanficSection } from './fanfic-section';

describe('FanficSection', () => {
  let component: FanficSection;
  let fixture: ComponentFixture<FanficSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FanficSection],
    }).compileComponents();

    fixture = TestBed.createComponent(FanficSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
