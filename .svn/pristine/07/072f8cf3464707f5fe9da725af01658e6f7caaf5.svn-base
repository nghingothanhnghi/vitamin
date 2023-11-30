import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductCategoryComponent } from "./product-category/product-category.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductSearchComponent } from "./product-search/product-search.component";

const routes: Routes = [
  { path: "", component: ProductListComponent },
  { path: "category/:cateCd", component: ProductCategoryComponent },
  { path: "product-search", component: ProductSearchComponent },
  { path: "product/:pdtCd", component: ProductDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingHomeRoutingModule {}
