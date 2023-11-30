import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderInfoComponent } from './order-info/order-info.component';
import { OrderPaymentComponent } from './order-payment/order-payment.component';
import { OrderMoneyComponent } from './order-money/order-money.component';
import { OrderProductComponent } from './order-product/order-product.component';
import { OrderShippingComponent } from './order-shipping/order-shipping.component';
import { OrderPopupComponent } from './order-popup/order-popup.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComponentsModule } from '@app/components/components.module';
import { FormsModule } from '@angular/forms';
import { PipeModule } from '@app/pipes/pipe.module';
import { ReportModule } from '@app/myoffice/report/report.module';
import { DirectiveModule } from '@app/directive/directive.module';

@NgModule({
  declarations: [
    OrderInfoComponent,
    OrderShippingComponent,
    OrderPaymentComponent,
    OrderMoneyComponent,
    OrderProductComponent,
    OrderPopupComponent,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    ComponentsModule,
    FormsModule,
    PipeModule,
    ReportModule,
    DirectiveModule,
  ], 
  exports: [
    OrderInfoComponent,
    OrderShippingComponent,
    OrderPaymentComponent,
    OrderMoneyComponent,
    OrderProductComponent,
    OrderPopupComponent,
  ]
})
export class OrderDetailsInquiryModule { }
