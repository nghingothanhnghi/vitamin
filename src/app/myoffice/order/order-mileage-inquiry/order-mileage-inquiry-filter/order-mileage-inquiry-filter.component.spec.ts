import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMileageInquiryFilterComponent } from './order-mileage-inquiry-filter.component';

describe('OrderMileageInquiryFilterComponent', () => {
  let component: OrderMileageInquiryFilterComponent;
  let fixture: ComponentFixture<OrderMileageInquiryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderMileageInquiryFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderMileageInquiryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
