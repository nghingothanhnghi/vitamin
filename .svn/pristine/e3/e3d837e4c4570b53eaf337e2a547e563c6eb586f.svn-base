import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingHomeComponent } from './shopping-home.component';
import { ComponentsModule } from '@app/components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from '@app/pipes/pipe.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ShoppingHomeRoutingModule } from './shopping-home-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductMetaComponent } from './product-detail/product-meta/product-meta.component';
import { ProductContentComponent } from './product-detail/product-content/product-content.component';
import { ProductRelatedComponent } from './product-detail/product-related/product-related.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { DirectiveModule } from '@app/directive/directive.module';

@NgModule({
  declarations: [
    ShoppingHomeComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductMetaComponent,
    ProductContentComponent,
    ProductRelatedComponent,
    ProductSearchComponent,
    ProductCategoryComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ShoppingHomeRoutingModule,
    PipeModule,
    NgxPaginationModule,
    DirectiveModule,
  ],
  exports: [
    ShoppingHomeComponent,
    ProductListComponent,
    ProductSearchComponent
  ]
})
export class ShoppingHomeModule { }
