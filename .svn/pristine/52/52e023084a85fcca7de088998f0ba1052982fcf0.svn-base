import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoshipRegisterComponent } from './autoship-register/autoship-register.component';
import { AutoshipPaymentStatusComponent } from './autoship-payment-status/autoship-payment-status.component';
import { AutoshipRegistrationDetailsComponent } from './autoship-registration-details/autoship-registration-details.component';
import { AutoshipEditComponent } from './autoship-edit/autoship-edit.component';

const routes: Routes = [
  { path: "register", component: AutoshipRegisterComponent },
  { path: "edit", component: AutoshipEditComponent },
  { path : 'registration-details', component: AutoshipRegistrationDetailsComponent },
  { path : 'payment-status', component: AutoshipPaymentStatusComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class AutoShipRoutingModule {

}
