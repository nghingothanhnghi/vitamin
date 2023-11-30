import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMileageInquiryComponent } from './order-mileage-inquiry.component';

describe('OrderMileageInquiryComponent', () => {
  let component: OrderMileageInquiryComponent;
  let fixture: ComponentFixture<OrderMileageInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderMileageInquiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderMileageInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
