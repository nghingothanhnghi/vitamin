import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitAccountingInquiryComponent } from './benefit-accounting-inquiry.component';

describe('BenefitAccountingInquiryComponent', () => {
  let component: BenefitAccountingInquiryComponent;
  let fixture: ComponentFixture<BenefitAccountingInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitAccountingInquiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenefitAccountingInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
