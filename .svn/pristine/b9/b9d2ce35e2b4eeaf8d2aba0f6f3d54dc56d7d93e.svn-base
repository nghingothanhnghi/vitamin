import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { OrderSearchGridComponent } from './order-search-grid/order-search-grid.component';
import { ComponentsModule } from '@app/components/components.module';
import { PipeModule } from '@app/pipes/pipe.module';
import { OrderSearchFilterComponent } from './order-search-filter/order-search-filter.component';
import { DirectiveModule } from '@app/directive/directive.module';

@NgModule({
  declarations: [
    OrderSearchFilterComponent,
    OrderSearchGridComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    NgxPaginationModule,
    PipeModule,
    DirectiveModule,
  ],
  exports: [
    OrderSearchFilterComponent,
    OrderSearchGridComponent,
  ]
})
export class OrderSearchModule { }
