import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { PipeModule } from '@app/pipes/pipe.module';
import { ComponentsModule } from '@app/components/components.module';
import { OrderProductsComponent } from './order-products/order-products.component';
import { OrderPaymentComponent } from './order-payment/order-payment.component';
import { DirectiveModule } from '@app/directive/directive.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeliPopupComponent } from './deli-popup/deli-popup.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderShippingComponent } from './order-shipping/order-shipping.component';
import { OrderPointComponent } from './order-point/order-point.component';
import { BankComponent } from './payment-method/bank/bank.component';
import { PersonalCardComponent } from './payment-method/card/personal-card/personal-card.component';
import { GeneralCardComponent } from './payment-method/card/general-card/general-card.component';
import { VbbankComponent } from './payment-method/vbbank/vbbank/vbbank.component';

@NgModule({
  declarations: [
    CheckoutComponent,
    OrderProductsComponent,
    OrderPaymentComponent,
    DeliPopupComponent,
    OrderShippingComponent,
    OrderPointComponent,
    BankComponent,
    PersonalCardComponent,
    GeneralCardComponent,
    VbbankComponent,
  ],
  imports: [
    CommonModule,
    PipeModule,
    ComponentsModule,
    NgxPaginationModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CheckoutComponent,
  ]
})
export class CheckoutModule { }
