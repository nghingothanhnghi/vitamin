import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccumuletSaComponent } from './accumulet-sa/accumulet-sa.component';
import { CertificationComponent } from './certification/certification.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { ProducttionFacilityComponent } from './producttion-facility/producttion-facility.component';

const routes: Routes = [
  { 
    path: '', 
    children: [
      { path: 'accumulet-SA', component: AccumuletSaComponent },
      { path: 'credentials',component:CertificationComponent},
      { path: 'introduction',component:ProductDescriptionComponent},
      { path: 'facility',component:ProducttionFacilityComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
  exports: [RouterModule]
})


export class ProductIntroductionRoutingModule {

}