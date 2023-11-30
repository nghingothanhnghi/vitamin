import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicePagRoutingModule } from './service-page-routing.module';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { ServiceCenterComponent } from './service-center/service-center.component';
import { SalesAssistanceInquiryComponent } from './sales-assistance-inquiry/sales-assistance-inquiry.component';
import { ComponentsModule } from '@app/components/components.module';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { CodeEffect } from '@app/effects/system/code.effect';
import { EffectsModule } from '@ngrx/effects';
import { detailNoticeReducer, noticeDetailFeatureKey } from '@app/reducers/myoffice/notice/notice-detail.reducer';
import { PipeModule } from '@app/pipes/pipe.module';

@NgModule({
  declarations: [
  
    PrivacyPolicyComponent,
         TermsOfUseComponent,
         ServiceCenterComponent,
         SalesAssistanceInquiryComponent,
  ],
  imports: [
    CommonModule,
    ServicePagRoutingModule,
    ComponentsModule,
    FormsModule,
    PipeModule,
    StoreModule.forFeature(noticeDetailFeatureKey, detailNoticeReducer),
    EffectsModule.forFeature([CodeEffect])
  
  ],
  exports: [

  ]
})
export class ServicePageModule { }
