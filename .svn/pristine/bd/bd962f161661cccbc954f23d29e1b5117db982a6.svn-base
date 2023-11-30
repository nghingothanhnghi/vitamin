import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ReportLayoutRoutingModule } from './report-layout-routing.module';
import { orderReportFeatureKey, orderReportReducer } from '@app/reducers/myoffice/report/order-report.reducer';
import { memberInfoInquiryFeatureKey, memInfoInquiryReducer } from '@app/reducers/myoffice/member/member-infor-inquiry.reducer';
import { MemberInforInquiryEffect } from '@app/effects/myoffice/member/member-infor-inquiry.effect';
import { OrderReportEffect } from '@app/effects/myoffice/report/order-report.effect';
import { smWownetFeatureKey, smWownetReducer } from '@app/reducers/system/sm-wownet.reducer';
import { SmWownetEffect } from '@app/effects/system/sm-wownet.effect';
import { orderWithdrawalFeatureKey, orderWithdrawalReducer } from '@app/reducers/myoffice/report/order-withdrawal.reducer';
import { OrderWithdrawalEffect } from '@app/effects/myoffice/report/order-withdrawal.effect';
import { BenefitStatementEffect } from '@app/effects/myoffice/benefit/benefit-statement.effects';
import { benefitStatementSearchFeatureKey, benefitStatementSearchReducer } from '@app/reducers/myoffice/benefit/benefit-statement.reducer';
import { witholdingTaxSearchFeatureKey, witholdingTaxSearchReducer } from '@app/reducers/myoffice/benefit/witholding-tax.reducer';
import { WitholdingTaxEffect } from '@app/effects/myoffice/benefit/witholding-tax.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReportLayoutRoutingModule,
    StoreModule.forFeature(orderReportFeatureKey, orderReportReducer),
    StoreModule.forFeature(memberInfoInquiryFeatureKey, memInfoInquiryReducer),
    StoreModule.forFeature(orderWithdrawalFeatureKey, orderWithdrawalReducer),
    StoreModule.forFeature(smWownetFeatureKey, smWownetReducer,),
    StoreModule.forFeature(benefitStatementSearchFeatureKey, benefitStatementSearchReducer),
    StoreModule.forFeature(witholdingTaxSearchFeatureKey, witholdingTaxSearchReducer),
    EffectsModule.forFeature([OrderReportEffect, MemberInforInquiryEffect, SmWownetEffect, OrderWithdrawalEffect,BenefitStatementEffect,WitholdingTaxEffect]),
  ]
})
export class ReportLayoutModule { }
