import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCalendarSumComponent } from './order-calendar-sum.component';

describe('OrderCalendarSumComponent', () => {
  let component: OrderCalendarSumComponent;
  let fixture: ComponentFixture<OrderCalendarSumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCalendarSumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCalendarSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
