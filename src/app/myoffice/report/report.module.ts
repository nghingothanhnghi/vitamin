import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderReportComponent } from './order-report/order-report.component';
import { PipeModule } from '@app/pipes/pipe.module';
import { OrderWithdrawalComponent } from './order-withdrawal/order-withdrawal.component';
import { MemberInquiryReportComponent } from './member-inquiry-report/member-inquiry-report.component';
import { BenefitStatementReportComponent } from './benefit-report/benefit-statement/benefit-statement-report/benefit-statement-report.component';
import { WitholdingTaxReportComponent } from './benefit-report/witholding-tax-report/witholding-tax-report.component';

@NgModule({
  declarations: [
    OrderReportComponent,
    OrderWithdrawalComponent,
    MemberInquiryReportComponent,
    BenefitStatementReportComponent,
    WitholdingTaxReportComponent 
  ],
  imports: [
    CommonModule,
    PipeModule,
  ],
  exports: [
    OrderReportComponent,
    OrderWithdrawalComponent,
    MemberInquiryReportComponent,
    BenefitStatementReportComponent,
    WitholdingTaxReportComponent
  ]
})
export class ReportModule { }
