import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FanficSearch } from './fanfic-search';

describe('FanficSearch', () => {
  let component: FanficSearch;
  let fixture: ComponentFixture<FanficSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FanficSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(FanficSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
