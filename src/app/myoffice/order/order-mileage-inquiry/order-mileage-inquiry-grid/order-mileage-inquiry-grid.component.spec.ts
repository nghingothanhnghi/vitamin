import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMileageInquiryGridComponent } from './order-mileage-inquiry-grid.component';

describe('OrderMileageInquiryGridComponent', () => {
  let component: OrderMileageInquiryGridComponent;
  let fixture: ComponentFixture<OrderMileageInquiryGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderMileageInquiryGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderMileageInquiryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
