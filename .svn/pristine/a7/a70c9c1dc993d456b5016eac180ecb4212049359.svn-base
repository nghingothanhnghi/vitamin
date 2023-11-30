import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { OmnitritionUnsoldProductInquiryComponent } from './omnitrition-unsold-product-inquiry/omnitrition-unsold-product-inquiry.component';
import { OmnitritionConsumerSalesRegistrationComponent } from './omnitrition-consumer-sales-registration/omnitrition-consumer-sales-registration.component';
import { OmnitritionConsumerSalesRatioInquiryComponent } from './omnitrition-consumer-sales-ratio-inquiry/omnitrition-consumer-sales-ratio-inquiry.component';
import { OmnitritionConsumerRegistrationComponent } from './omnitrition-consumer-registration/omnitrition-consumer-registration.component';
import { OmnitritionConsumerInquiryComponent } from './omnitrition-consumer-inquiry/omnitrition-consumer-inquiry.component';
import { OmnitritionRoutingModule } from './omnitrition-routing.module';
import { ComponentsModule } from '@app/components/components.module';

import { consumerInquiryFeatureKey, consumerInquiryReducer } from '@reducers/myoffice/omnitrition/omnitrition-consumer-inquiry.reducer';
import { OmnitritionConsumerInquiryEffect } from '@effects/myoffice/omnitrition/omnitrition-consumer-inquiry.effect';
import { unsoldProductInquiryFeatureKey, unsoldProductInquiryReducer } from '@reducers/myoffice/omnitrition/omnitrition-unsold-product-inquiry.reducer';
import { UnsoldProductInquiryEffect } from '@effects/myoffice/omnitrition/omnitrition-unsold-product-inquiry.effect';
import { consSalesRatioInquiryFeatureKey, consSalesRatioInquiryReducer } from '@reducers/myoffice/omnitrition/omnitrition-consumer-sales-ratio-Inquiry.reducer';
import { ConsSalesRatioInquiryEffect } from '@effects/myoffice/omnitrition/omnitrition-consumer-sales-ratio-inquiry.effect';
import { consumerRegistrationFeatureKey, consumerRegistrationReducer } from '@reducers/myoffice/omnitrition/omnitrition-consumer-registration.reducer';
import { OmnitritionConsumerRegisEffect } from '@effects/myoffice/omnitrition/omnitrition-consumer-registration.effect';
import { consumerSalesRegisFeatureKey, consumerSalesRegisReducer } from '@reducers/myoffice/omnitrition/consumer-sales-registration.reducer';
import { ConsumerSalesRegisEffect } from '@effects/myoffice/omnitrition/consumer-sales-registration.effect';
import { DirectiveModule } from '@app/directive/directive.module';






@NgModule({
  declarations: [
    OmnitritionUnsoldProductInquiryComponent,
    OmnitritionConsumerSalesRegistrationComponent,
    OmnitritionConsumerSalesRatioInquiryComponent,
    OmnitritionConsumerRegistrationComponent,
    OmnitritionConsumerInquiryComponent,

  ],
  imports: [
    CommonModule,
    OmnitritionRoutingModule,
    ComponentsModule,
    FormsModule,
    NgxPaginationModule,
    DirectiveModule,

    
    StoreModule.forFeature(consumerInquiryFeatureKey,consumerInquiryReducer ),
    EffectsModule.forFeature([OmnitritionConsumerInquiryEffect]),

    StoreModule.forFeature(unsoldProductInquiryFeatureKey,unsoldProductInquiryReducer ),
    EffectsModule.forFeature([UnsoldProductInquiryEffect]),

    StoreModule.forFeature(consSalesRatioInquiryFeatureKey,consSalesRatioInquiryReducer ),
    EffectsModule.forFeature([ConsSalesRatioInquiryEffect]),

    StoreModule.forFeature(consumerRegistrationFeatureKey,consumerRegistrationReducer ),
    EffectsModule.forFeature([OmnitritionConsumerRegisEffect]),

    StoreModule.forFeature(consumerSalesRegisFeatureKey,consumerSalesRegisReducer),
    EffectsModule.forFeature([ConsumerSalesRegisEffect]),
  ]
})
export class OmnitritionModule { }
