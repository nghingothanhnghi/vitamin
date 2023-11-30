import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardDetailComponent } from '@app/myoffice/notice/board-detail/board-detail.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SalesAssistanceInquiryComponent } from './sales-assistance-inquiry/sales-assistance-inquiry.component';
import { ServiceCenterComponent } from './service-center/service-center.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';



const routes: Routes = [
  { 
    path: '', 
    children: [
        { path: 'privacy-policy', component: PrivacyPolicyComponent },
        { path: 'terms-of-use', component: TermsOfUseComponent },
        { path: 'service-center', component: ServiceCenterComponent },
        { path: 'sales-assistance-inquiry', component: SalesAssistanceInquiryComponent },
        { path: 'archives-board-detail', component: BoardDetailComponent },
        { path: 'last-broadcast-detail', component: BoardDetailComponent },
        { path: 'now-apielgo-detail', component: BoardDetailComponent },
        { path: 'hall-of-fame-detail', component: BoardDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
  exports: [RouterModule]
})


export class ServicePagRoutingModule {

}