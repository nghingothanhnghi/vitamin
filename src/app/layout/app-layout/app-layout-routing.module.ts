import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout.component';

const myofficeModule = () => import ("@myoffice/myoffice.module").then(x=> x.MyofficeModule);
const homepageModule = () => import ("@homepage/home-page.module").then(x=> x.HomePageModule);
const shoppingModule = () => import ("@shopping/shopping-mall.module").then(x=> x.ShoppingMallModule);
const loginModule    = () => import ("@login/login.module").then(x => x.LoginModule);

const routes: Routes = [
  { 
    path: '', component: AppLayoutComponent, children: [
      { path: '', loadChildren: homepageModule },
      { path: 'my-office', loadChildren: myofficeModule },
      //{ path: 'shopping-mall', loadChildren: shoppingModule },
      //{ path: 'shopping-mall/cate/:cate', loadChildren: shoppingModule },
      { path: 'login', loadChildren: loginModule },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
