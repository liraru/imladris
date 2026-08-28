import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Editorials } from './editorials';

describe('Editorials', () => {
  let component: Editorials;
  let fixture: ComponentFixture<Editorials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editorials],
    }).compileComponents();

    fixture = TestBed.createComponent(Editorials);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
