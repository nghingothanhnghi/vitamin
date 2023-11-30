import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitDetailsInquiryComponent } from './benefit-details-inquiry/benefit-details-inquiry/benefit-details-inquiry.component';
import { BenefitRoutingModule } from './benefit-routing.module';
import { BenefitAccountingInquiryComponent } from './benefit-accounting-inquiry/benefit-accounting-inquiry/benefit-accounting-inquiry.component';
import { BenefitSponsorshipDetailsComponent } from './benefit-sponsorship-details/benefit-sponsorship-details/benefit-sponsorship-details.component';
import { BenefitStatementComponent } from './benefit-statement/benefit-statement/benefit-statement.component';
import { BenefitRemittanceDetailsComponent } from './benefit-remittance-details/benefit-remittance-details/benefit-remittance-details.component';
import { WitholdingTaxComponent } from './witholding-tax/witholding-tax/witholding-tax.component';
import { BenefitCalendarComponent } from './benefit-calendar/benefit-calendar/benefit-calendar.component';
import { BenefitAnalysisComponent } from './benefit-analysis/benefit-analysis/benefit-analysis.component';
import { FormsModule } from '@angular/forms';
import { BenefitDetailsInquiryEffect } from '@app/effects/myoffice/benefit/benefit.effects';
import { benefitSearchFeatureKey, benefitSearchReducer } from '@app/reducers/myoffice/benefit/benefit-details-inquiry.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '@app/components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { benefitAccountingInquirySearchFeatureKey, benefitAcountingInquirySearchReducer } from '@app/reducers/myoffice/benefit/benefit-accounting-inquiry.reducer';
import { BenefitAccountingInquiryEffect } from '@app/effects/myoffice/benefit/benefit-accounting-inquiry.effects';
import { benefitSponsorshipDetailsSearchFeatureKey, benefitSponsorshipDetailsSearchReducer } from '@app/reducers/myoffice/benefit/benefit-sponsorship-details.reducer';
import { BenefitSponsorshipDetailsEffect } from '@app/effects/myoffice/benefit/benefit-sponsorship-details.effect';
import { benefitRemittanceDetailsSearchFeatureKey, benefitRemittanceDetailsSearchReducer } from '@app/reducers/myoffice/benefit/benefit-remittance-details.reducer';
import { BenefitRemittanceDetailsEffect } from '@app/effects/myoffice/benefit/benefit-remittance-details.effects';
import { witholdingTaxSearchFeatureKey, witholdingTaxSearchReducer } from '@app/reducers/myoffice/benefit/witholding-tax.reducer';
import { WitholdingTaxEffect } from '@app/effects/myoffice/benefit/witholding-tax.effects';
import { benefitCalendarFeatureKey, benefitCalendarSearchReducer } from '@app/reducers/myoffice/benefit/benefit-calendar.reducer';
import { BenefitCalendarEffect } from '@app/effects/myoffice/benefit/benefit-calendar.effects';
import { BenefitCalendarTableComponent } from './benefit-calendar/benefit-calendar-table/benefit-calendar-table/benefit-calendar-table.component';
import { PipeModule } from '@app/pipes/pipe.module';
import { GoogleChartsModule } from 'angular-google-charts';  
import { benefitAnalysisSearchFeatureKey, benefitAnalysisSearchReducer } from '@app/reducers/myoffice/benefit/benefi-analysis.reducer';
import { BenefitAnalysisEffect } from '@app/effects/myoffice/benefit/benefit-analysis.effects';
import { benefitStatementSearchFeatureKey, benefitStatementSearchReducer } from '@app/reducers/myoffice/benefit/benefit-statement.reducer';
import { BenefitStatementEffect } from '@app/effects/myoffice/benefit/benefit-statement.effects';
import { DirectiveModule } from '@app/directive/directive.module';

@NgModule({
  declarations: [BenefitDetailsInquiryComponent, BenefitAccountingInquiryComponent, BenefitSponsorshipDetailsComponent, BenefitStatementComponent, BenefitRemittanceDetailsComponent, WitholdingTaxComponent, BenefitCalendarComponent, BenefitAnalysisComponent, BenefitCalendarTableComponent],
  imports: [
    CommonModule,
    BenefitRoutingModule,
    ComponentsModule,
    StoreModule.forFeature(benefitSearchFeatureKey, benefitSearchReducer), // benefit-details-inquiry
    EffectsModule.forFeature([BenefitDetailsInquiryEffect]),
    StoreModule.forFeature(benefitAccountingInquirySearchFeatureKey, benefitAcountingInquirySearchReducer),// benefit-accounting-inquiry
    EffectsModule.forFeature([BenefitAccountingInquiryEffect]),
    StoreModule.forFeature(benefitSponsorshipDetailsSearchFeatureKey, benefitSponsorshipDetailsSearchReducer),// benefit-sponsorship-details
    EffectsModule.forFeature([BenefitSponsorshipDetailsEffect]),
    StoreModule.forFeature(benefitRemittanceDetailsSearchFeatureKey, benefitRemittanceDetailsSearchReducer),// benefit-remittance-details
    EffectsModule.forFeature([BenefitRemittanceDetailsEffect]),
    StoreModule.forFeature(witholdingTaxSearchFeatureKey, witholdingTaxSearchReducer),// witholding-tax
    EffectsModule.forFeature([WitholdingTaxEffect]),
    StoreModule.forFeature(benefitCalendarFeatureKey, benefitCalendarSearchReducer),// benefit-calendar
    EffectsModule.forFeature([BenefitCalendarEffect]),
    StoreModule.forFeature(benefitAnalysisSearchFeatureKey, benefitAnalysisSearchReducer),// benefit-analysis
    EffectsModule.forFeature([BenefitAnalysisEffect]),
    StoreModule.forFeature(benefitStatementSearchFeatureKey, benefitStatementSearchReducer),// benefit-statement
    EffectsModule.forFeature([BenefitStatementEffect]),
    FormsModule,
    PipeModule,
    NgxPaginationModule,
    GoogleChartsModule,
    DirectiveModule 

  ]
})
export class BenefitModule { }
