import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyOrderCountGridComponent } from './monthly-order-count-grid.component';

describe('MonthlyOrderCountGridComponent', () => {
  let component: MonthlyOrderCountGridComponent;
  let fixture: ComponentFixture<MonthlyOrderCountGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyOrderCountGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyOrderCountGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
