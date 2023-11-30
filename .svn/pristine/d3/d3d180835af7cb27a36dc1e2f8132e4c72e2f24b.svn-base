import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BenefitAccountingInquiryComponent } from './benefit-accounting-inquiry/benefit-accounting-inquiry/benefit-accounting-inquiry.component';
import { BenefitAnalysisComponent } from './benefit-analysis/benefit-analysis/benefit-analysis.component';
import { BenefitCalendarComponent } from './benefit-calendar/benefit-calendar/benefit-calendar.component';
import { BenefitDetailsInquiryComponent } from './benefit-details-inquiry/benefit-details-inquiry/benefit-details-inquiry.component';
import { BenefitRemittanceDetailsComponent } from './benefit-remittance-details/benefit-remittance-details/benefit-remittance-details.component';
import { BenefitSponsorshipDetailsComponent } from './benefit-sponsorship-details/benefit-sponsorship-details/benefit-sponsorship-details.component';
import { BenefitStatementComponent } from './benefit-statement/benefit-statement/benefit-statement.component';
import { WitholdingTaxComponent } from './witholding-tax/witholding-tax/witholding-tax.component';

const routes: Routes = [
    {path : 'benefit-details-inquiry', component: BenefitDetailsInquiryComponent},
    {path : 'benefit-accounting-inquiry', component: BenefitAccountingInquiryComponent},
    {path : 'benefit-sponsorship-details', component: BenefitSponsorshipDetailsComponent},
    {path : 'benefit-statement', component: BenefitStatementComponent},
    {path : 'benefit-remittance-details', component: BenefitRemittanceDetailsComponent},
    {path : 'witholding-tax', component: WitholdingTaxComponent},
    {path : 'benefit-calendar', component: BenefitCalendarComponent},
    {path : 'benefit-analysis', component: BenefitAnalysisComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class BenefitRoutingModule {

}
