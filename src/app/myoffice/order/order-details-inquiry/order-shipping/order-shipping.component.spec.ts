import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderShippingComponent } from './order-shipping.component';

describe('OrderShippingComponent', () => {
  let component: OrderShippingComponent;
  let fixture: ComponentFixture<OrderShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderShippingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
