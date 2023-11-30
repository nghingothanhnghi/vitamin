import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { ComponentsModule } from '@app/components/components.module';
import { MemberSearchFilterComponent } from './member-search-filter/member-search-filter.component';
import { MemberSearchGridComponent } from './member-search-grid/member-search-grid.component';
import { DirectiveModule } from '@app/directive/directive.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  
    MemberSearchFilterComponent,
    MemberSearchGridComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    NgxPaginationModule,
    FormsModule,
    DirectiveModule
  ],
  exports: [
    MemberSearchFilterComponent,
    MemberSearchGridComponent,
  ]
})
export class MemberSearchModule { }
