import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitStatementReportComponent } from './benefit-statement-report.component';

describe('BenefitStatementReportComponent', () => {
  let component: BenefitStatementReportComponent;
  let fixture: ComponentFixture<BenefitStatementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitStatementReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenefitStatementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
