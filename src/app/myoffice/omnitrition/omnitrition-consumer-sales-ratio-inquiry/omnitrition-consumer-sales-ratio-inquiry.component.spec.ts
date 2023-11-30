import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmnitritionConsumerSalesRatioInquiryComponent } from './omnitrition-consumer-sales-ratio-inquiry.component';

describe('OmnitritionConsumerSalesRatioInquiryComponent', () => {
  let component: OmnitritionConsumerSalesRatioInquiryComponent;
  let fixture: ComponentFixture<OmnitritionConsumerSalesRatioInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmnitritionConsumerSalesRatioInquiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmnitritionConsumerSalesRatioInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
