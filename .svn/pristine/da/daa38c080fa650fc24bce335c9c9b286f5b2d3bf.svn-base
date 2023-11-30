import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { MonthlyOrderCountFilterComponent } from './monthly-order-count-filter/monthly-order-count-filter.component';
import { MonthlyOrderCountGridComponent } from './monthly-order-count-grid/monthly-order-count-grid.component';
import { ComponentsModule } from '@app/components/components.module';
import { PipeModule } from '@app/pipes/pipe.module';
import { DirectiveModule } from '@app/directive/directive.module';


@NgModule({
  declarations: [
    MonthlyOrderCountFilterComponent,
    MonthlyOrderCountGridComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    NgxPaginationModule,
    PipeModule,
    DirectiveModule,
  ],
  exports: [
    MonthlyOrderCountFilterComponent,
    MonthlyOrderCountGridComponent,
  ]
})
export class MonthlyOrderCountModule { }
