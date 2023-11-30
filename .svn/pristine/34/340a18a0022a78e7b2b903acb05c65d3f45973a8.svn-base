import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderReportComponent } from '@app/myoffice/report/order-report/order-report.component';
import { OrderWithdrawalComponent } from '@app/myoffice/report/order-withdrawal/order-withdrawal.component';
import { MemberInquiryReportComponent } from '@app/myoffice/report/member-inquiry-report/member-inquiry-report.component';
import { BenefitStatementReportComponent } from '@app/myoffice/report/benefit-report/benefit-statement/benefit-statement-report/benefit-statement-report.component';
import { WitholdingTaxReportComponent } from '@app/myoffice/report/benefit-report/witholding-tax-report/witholding-tax-report.component';

const routes: Routes = [
  { path: "order/:userid/:orderNo", component: OrderReportComponent },
  { path: "order-withdrawal/:orderNo", component: OrderWithdrawalComponent },
  { path: "member-inquiry/:userId", component: MemberInquiryReportComponent },
  { path: "benefit-statement-report", component: BenefitStatementReportComponent },
  { path: "witholding-tax-report", component: WitholdingTaxReportComponent }
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportLayoutRoutingModule { }
