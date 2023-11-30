import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@app/services/auth/auth-guard.service';
import { OsDoComponent } from '@myoffice/os.do/os.do.component';

const memberModule = () => import("@myoffice/member/member.module").then(x=> x.MemberModule);
const orderModule = () => import("@myoffice/order/order.module").then(x => x.OrderModule);
const benefitModule = () => import('./benefit/benefit.module') .then(mod => mod.BenefitModule)
const omnitritionModule = () => import("@myoffice/omnitrition/omnitrition.module").then(x => x.OmnitritionModule);
const userProfileModule = () => import("@myoffice/user-profile/user-profile.module").then(x => x.UserProfileModule);
const dashBoardModule = () => import('./dashboard/dashboard.module') .then(x => x.DashBoardModule);
const autoShip = () => import('./auto-ship/auto-ship.module') .then(x => x.AutoShipModule);

const routes: Routes = [
  { path: "", canActivate: [AuthGuardService], loadChildren: dashBoardModule },
  { path: 'member-management', loadChildren: memberModule },
  { path: "order-management", canActivate: [AuthGuardService], loadChildren: orderModule },
  { path: "omnitrition", canActivate: [AuthGuardService], loadChildren: omnitritionModule },
  { path: "benefit-management", canActivate: [AuthGuardService], loadChildren: benefitModule },
  { path: "user-profile", canActivate: [AuthGuardService], loadChildren: userProfileModule },
  { path: "auto-ship", canActivate: [AuthGuardService], loadChildren: autoShip }
  ];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class MyofficeRoutingModule {

}
