import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmnitritionConsumerInquiryComponent } from './omnitrition-consumer-inquiry.component';

describe('OmnitritionConsumerInquiryComponent', () => {
  let component: OmnitritionConsumerInquiryComponent;
  let fixture: ComponentFixture<OmnitritionConsumerInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmnitritionConsumerInquiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmnitritionConsumerInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
