import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YearlyReadingsSearch } from './yearly-readings-search';

describe('YearlyReadingsSearch', () => {
  let component: YearlyReadingsSearch;
  let fixture: ComponentFixture<YearlyReadingsSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearlyReadingsSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(YearlyReadingsSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
