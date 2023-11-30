import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderMileageInquiryFilterComponent } from './order-mileage-inquiry-filter/order-mileage-inquiry-filter.component';
import { OrderMileageInquiryGridComponent } from './order-mileage-inquiry-grid/order-mileage-inquiry-grid.component';
import { ComponentsModule } from '@app/components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from '@app/pipes/pipe.module';
import { DirectiveModule } from '@app/directive/directive.module';

@NgModule({
  declarations: [
    OrderMileageInquiryFilterComponent,
    OrderMileageInquiryGridComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    NgxPaginationModule,
    PipeModule,
    DirectiveModule,
  ], 
  exports: [
    OrderMileageInquiryFilterComponent,
    OrderMileageInquiryGridComponent,
  ]
})
export class OrderMileageInquiryModule { }
