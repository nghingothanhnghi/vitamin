import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OmnitritionConsumerInquiryComponent } from './omnitrition-consumer-inquiry/omnitrition-consumer-inquiry.component';
import { OmnitritionUnsoldProductInquiryComponent } from './omnitrition-unsold-product-inquiry/omnitrition-unsold-product-inquiry.component';
import { OmnitritionConsumerSalesRegistrationComponent } from './omnitrition-consumer-sales-registration/omnitrition-consumer-sales-registration.component';
import { OmnitritionConsumerSalesRatioInquiryComponent } from './omnitrition-consumer-sales-ratio-inquiry/omnitrition-consumer-sales-ratio-inquiry.component';
import { OmnitritionConsumerRegistrationComponent } from './omnitrition-consumer-registration/omnitrition-consumer-registration.component';

const routes: Routes = [
  { 
    path: '', 
    children: [
      { path: 'omnitrition-consumer-registration', component: OmnitritionConsumerRegistrationComponent },
      { path: 'omnitrition-consumer-inquiry',component:OmnitritionConsumerInquiryComponent},
      { path: 'omnitrition-consumer-sales-registration',component:OmnitritionConsumerSalesRegistrationComponent},
      { path: 'unsold-product-inquiry',component:OmnitritionUnsoldProductInquiryComponent},
      { path: 'consumer-sales-ratio-inquiry',component:OmnitritionConsumerSalesRatioInquiryComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class OmnitritionRoutingModule {

}