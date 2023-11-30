import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrderProductSearchFilterComponent } from './order-product-search-filter/order-product-search-filter.component';
import { OrderProductSearchGridComponent } from './order-product-search-grid/order-product-search-grid.component';
import { ComponentsModule } from '@app/components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from '@app/pipes/pipe.module';
import { DirectiveModule } from '@app/directive/directive.module';

@NgModule({
  declarations: [
    OrderProductSearchFilterComponent,
    OrderProductSearchGridComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    NgxPaginationModule,
    PipeModule,
    FormsModule,
    DirectiveModule,
  ],
  exports: [
    OrderProductSearchFilterComponent,
    OrderProductSearchGridComponent,
  ]
})
export class OrderProductSearchModule { }
