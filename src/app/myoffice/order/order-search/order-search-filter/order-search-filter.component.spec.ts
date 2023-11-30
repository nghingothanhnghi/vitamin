import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSearchFilterComponent } from './order-search-filter.component';

describe('OrderSearchFilterComponent', () => {
  let component: OrderSearchFilterComponent;
  let fixture: ComponentFixture<OrderSearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSearchFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
