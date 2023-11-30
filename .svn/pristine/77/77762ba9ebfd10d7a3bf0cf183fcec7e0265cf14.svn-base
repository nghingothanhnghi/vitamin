import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxPaginationModule } from 'ngx-pagination';
import { ComponentsModule } from '@app/components/components.module';
import { SubOrderSearchGridComponent } from './sub-order-search-grid/sub-order-search-grid.component';
import { SubOrderSearchFilterComponent } from './sub-order-search-filter/sub-order-search-filter.component';
import { PipeModule } from '@app/pipes/pipe.module';
import { DirectiveModule } from '@app/directive/directive.module';

@NgModule({
  declarations: [
    SubOrderSearchGridComponent,
    SubOrderSearchFilterComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    NgxPaginationModule,
    PipeModule,
    DirectiveModule,
  ],
  exports: [
    SubOrderSearchGridComponent,
    SubOrderSearchFilterComponent,
  ]
})
export class SubOrderSearchModule { }
