import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProductSearchFilterComponent } from './order-product-search-filter.component';

describe('OrderProductSearchFilterComponent', () => {
  let component: OrderProductSearchFilterComponent;
  let fixture: ComponentFixture<OrderProductSearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderProductSearchFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProductSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
