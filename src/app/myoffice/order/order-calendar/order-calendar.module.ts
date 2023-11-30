import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderCalendarSumComponent } from './order-calendar-sum/order-calendar-sum.component';
import { ComponentsModule } from '@app/components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from '@app/pipes/pipe.module';
import { OrderCalendarTableComponent } from './order-calendar-table/order-calendar-table.component';
import { OrderCalendarDetailComponent } from './order-calendar-table/order-calendar-detail/order-calendar-detail.component';

@NgModule({
  declarations: [
    OrderCalendarSumComponent,
    OrderCalendarTableComponent,
    OrderCalendarDetailComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    NgxPaginationModule,
    PipeModule,
  ],
  exports: [
    OrderCalendarSumComponent,
    OrderCalendarTableComponent,
    OrderCalendarDetailComponent,
  ]
})
export class OrderCalendarModule { }
