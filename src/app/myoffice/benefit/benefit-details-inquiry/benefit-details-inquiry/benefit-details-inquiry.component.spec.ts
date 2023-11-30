import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitDetailsInquiryComponent } from './benefit-details-inquiry.component';

describe('BenefitDetailsInquiryComponent', () => {
  let component: BenefitDetailsInquiryComponent;
  let fixture: ComponentFixture<BenefitDetailsInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitDetailsInquiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenefitDetailsInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
