import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from '@app/pipes/pipe.module';
import { CartComponent } from './cart.component';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { CartPaymentComponent } from './cart-payment/cart-payment.component';



@NgModule({
  declarations: [
    CartComponent,
    CartItemsComponent,
    CartPaymentComponent,
  ],
  imports: [
    CommonModule,
    PipeModule,
  ], 
  exports: [
    CartComponent,
    CartItemsComponent,
    CartPaymentComponent,
  ]
})
export class CartModule { }
