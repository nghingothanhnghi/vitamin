import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCalendarTableComponent } from './order-calendar-table.component';

describe('OrderCalendarTableComponent', () => {
  let component: OrderCalendarTableComponent;
  let fixture: ComponentFixture<OrderCalendarTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCalendarTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCalendarTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
