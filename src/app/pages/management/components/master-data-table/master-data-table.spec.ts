import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterDataTable } from './master-data-table';

describe('MasterDataTable', () => {
  let component: MasterDataTable;
  let fixture: ComponentFixture<MasterDataTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterDataTable],
    }).compileComponents();

    fixture = TestBed.createComponent(MasterDataTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
