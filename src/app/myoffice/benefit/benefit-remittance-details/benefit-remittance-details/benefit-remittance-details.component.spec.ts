import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitRemittanceDetailsComponent } from './benefit-remittance-details.component';

describe('BenefitRemittanceDetailsComponent', () => {
  let component: BenefitRemittanceDetailsComponent;
  let fixture: ComponentFixture<BenefitRemittanceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitRemittanceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenefitRemittanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
