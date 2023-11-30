import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ShoppingMallRoutingModule } from './shopping-mall-routing.module';
import { ComponentsModule } from '@app/components/components.module';
import { ShoppingHomeModule } from './shopping-home/shopping-home.module';
import { productFeatureKey, productReducer } from '@app/reducers/shoppingmall/product.reducer';
import { ProductEffect } from '@app/effects/shoppingmall/product.effect';
import { pdtDetailFeatureKey, pdtDetailReducer } from '@app/reducers/shoppingmall/pdt-detail.reducer';
import { PdtDetailEffect } from '@app/effects/shoppingmall/pdt-detail.effect';
import { CartModule } from './cart/cart.module';
import { CheckoutModule } from './checkout/checkout.module';
import { centerInfoFeatureKey, centerInfoReducer } from '@app/reducers/shoppingmall/center-info.reducer';
import { CenterInfoEffect } from '@app/effects/shoppingmall/center-info.effect';
import { deliPopupFeatureKey, deliPopupReducer } from '@app/reducers/shoppingmall/deli-popup.reducer';
import { DeliPopupEffect } from '@app/effects/shoppingmall/deli-popup.effect';
import { checkoutFeatureKey, checkoutReducer } from '@app/reducers/shoppingmall/checkout.reducer';
import { CheckoutEffect } from '@app/effects/shoppingmall/checkout.effect';
import { paymentBankFeatureKey, paymentBankReducer } from '@app/reducers/shoppingmall/payment-bank.reducer';
import { PaymentBankEffect } from '@app/effects/shoppingmall/payment-bank.effect';
import { maccoFeatureKey, maccoReducer } from '@app/reducers/shoppingmall/macco.reducer';
import { MaccoEffect } from '@app/effects/shoppingmall/macco.effect';
import { kiccPaymentFeatureKey, kiccPaymentReducer } from '@app/reducers/shoppingmall/kicc-payment.reducer';
import { KICCPaymentEffect } from '@app/effects/shoppingmall/kicc-payment.effect';
import { VbBankEffect } from '@app/effects/shoppingmall/vbbank.effect';
import { vbBankStateFeatureKey, vbBankStateReducer } from '@app/reducers/shoppingmall/vbbank.reducer';
import { korPaymentFeatureKey, korPaymentReducer } from '@app/reducers/shoppingmall/kor-payment.reducer';
import { KorPaymentEffect } from '@app/effects/shoppingmall/kor-payment.effect';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShoppingMallRoutingModule,
    ShoppingHomeModule,
    CartModule,
    CheckoutModule,
    ComponentsModule,

    StoreModule.forFeature(productFeatureKey, productReducer),
    StoreModule.forFeature(pdtDetailFeatureKey, pdtDetailReducer),
    StoreModule.forFeature(centerInfoFeatureKey, centerInfoReducer),
    StoreModule.forFeature(deliPopupFeatureKey, deliPopupReducer),
    StoreModule.forFeature(checkoutFeatureKey, checkoutReducer),
    StoreModule.forFeature(paymentBankFeatureKey, paymentBankReducer),
    StoreModule.forFeature(maccoFeatureKey, maccoReducer),
    StoreModule.forFeature(kiccPaymentFeatureKey, kiccPaymentReducer),
    StoreModule.forFeature(vbBankStateFeatureKey, vbBankStateReducer),
    StoreModule.forFeature(korPaymentFeatureKey, korPaymentReducer),
    EffectsModule.forFeature([
      ProductEffect,
      PdtDetailEffect,
      CenterInfoEffect,
      DeliPopupEffect,
      CheckoutEffect,
      PaymentBankEffect,
      MaccoEffect, 
      KICCPaymentEffect,
      VbBankEffect,
      KorPaymentEffect
    ]),
  ]
})
export class ShoppingMallModule { }
