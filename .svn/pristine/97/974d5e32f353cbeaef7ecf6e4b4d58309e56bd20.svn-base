import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "@app/services/auth/auth-guard.service";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ShoppingHomeComponent } from "./shopping-home/shopping-home.component";

const shoppingHomeModule = () => import("@shopping/shopping-home/shopping-home-routing.module").then(x => x.ShoppingHomeRoutingModule);

const routes: Routes = [
  { path: "", component: ShoppingHomeComponent, loadChildren: shoppingHomeModule },
  { path: "cart", canActivate: [AuthGuardService], component: CartComponent },
  { path: "checkout", canActivate: [AuthGuardService], component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingMallRoutingModule {}
