import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccumuletSaComponent } from './accumulet-sa/accumulet-sa.component';
import { CertificationComponent } from './certification/certification.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { ProducttionFacilityComponent } from './producttion-facility/producttion-facility.component';

import { ComponentsModule } from '@app/components/components.module';
import { ProductIntroductionRoutingModule } from './product-introduction-routing.module';
import {
  pdtCateFeatureKey,
  pdtCateReducer,
} from '@app/reducers/shoppingmall/pdt-cate.reducer';
import {
  productFeatureKey,
  productReducer,
} from '@app/reducers/shoppingmall/product.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffect } from '@app/effects/shoppingmall/product.effect';
import { PdtCateEffect } from '@app/effects/shoppingmall/pdt-cate.effect';
import { productIntroFeatureKey, productIntroReducer } from '@app/reducers/homepage/product-intro.reducer';
import { ProductIntroEffect } from '@app/effects/homepage/product-intro.effect';
import { PipeModule } from '@app/pipes/pipe.module';

@NgModule({
  declarations: [
    AccumuletSaComponent,
    CertificationComponent,
    ProductDescriptionComponent,
    ProducttionFacilityComponent,
  ],

  imports: [
    CommonModule,
    ComponentsModule,
    ProductIntroductionRoutingModule,
    PipeModule,

    StoreModule.forFeature(pdtCateFeatureKey, pdtCateReducer),
    StoreModule.forFeature(productFeatureKey, productReducer),
    StoreModule.forFeature(productIntroFeatureKey, productIntroReducer),
    EffectsModule.forFeature([PdtCateEffect, ProductEffect, ProductIntroEffect]),

  ],
})
export class ProductIntroductionModule {}
