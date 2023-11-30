import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuardService } from '@app/services/auth/auth-guard.service';

const mediaCenterModule = () => import ("@homepage/media-center/media-center.module").then(x=> x.MediaCenterModule);
const productIntroductionModule = () => import ("@homepage/product-introduction/product-introduction.module").then(x=> x.ProductIntroductionModule);
const business = () => import ("@homepage/business/business.module").then(x=> x.BusinessModule);
const aplgoKoreaModule = () => import ("@homepage/aplgo-korea/aplgo-korea.module").then(x=> x.AplgoKoreaModule);
const noticeModule = () => import('@myoffice/notice/notice.module') .then(x => x.NoticeModule);
const servicePageModule = () => import ("@homepage/service-page/service-page.module").then(x=> x.ServicePageModule);

const routes: Routes = [
  {        
       path: '', 
       children: [
         { path: '', component: HomePageComponent},
         { path: 'media-center',   canActivate: [AuthGuardService],  loadChildren: mediaCenterModule},
         { path: 'item-discription',  loadChildren: productIntroductionModule},
         { path: 'business',  loadChildren: business},
         { path: 'aincell',  loadChildren: aplgoKoreaModule},
         { path: "serviceCenter", canActivate: [AuthGuardService], loadChildren: noticeModule},
          {path: 'servicePage',  loadChildren: servicePageModule},
       ]        
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class HomePageRoutingModule {

}