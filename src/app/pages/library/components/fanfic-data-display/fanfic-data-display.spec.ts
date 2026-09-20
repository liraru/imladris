import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FanficDataDisplay } from './fanfic-data-display';

describe('FanficDataDisplay', () => {
  let component: FanficDataDisplay;
  let fixture: ComponentFixture<FanficDataDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FanficDataDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(FanficDataDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
