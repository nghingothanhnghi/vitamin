import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberSearchComponent } from './member-search/member-search.component';
import { MemberInformationInquiryComponent } from './member-information-inquiry/member-information-inquiry.component';
import { MemberPositionComponent } from './member-position/member-position.component';
import { MemberLineComponent } from './member-line/member-line.component';
import { MemberBoxComponent } from './member-box/member-box.component';
import { MemberAnalysisComponent } from './member-analysis/member-analysis.component';
import { ChooseMemberRegisterComponent } from './choose-member-register/choose-member-register.component';
import { MemberRegistrationStep1Component } from './member-registration-step1/member-registration-step1.component';
import { MemberRegistrationStep2Component } from './member-registration-step2/member-registration-step2.component';
import { MemberRegistrationStep3Component } from './member-registration-step3/member-registration-step3.component';
import { MemberRegistrationStep4Component } from './member-registration-step4/member-registration-step4.component';
import { AuthGuardService } from '@app/services/auth/auth-guard.service';
import { MemberInquiryByLegComponent } from './member-inquiry-by-leg/member-inquiry-by-leg.component';

const routes: Routes = [
  { 
    path: '', 
    children: [
      { path: 'member-infor-inquiry', canActivate: [AuthGuardService], component: MemberInformationInquiryComponent},
      { path: 'member-search', canActivate: [AuthGuardService], component: MemberSearchComponent},
      { path: 'member-inquiry-position', canActivate: [AuthGuardService], component: MemberPositionComponent},
      { path: 'line-lineage', canActivate: [AuthGuardService], component: MemberLineComponent},
      { path: 'box-lineage', canActivate: [AuthGuardService], component: MemberBoxComponent},
      { path: 'member-by-leg', canActivate: [AuthGuardService], component: MemberInquiryByLegComponent},
      { path: 'affiliate-member-analysis', canActivate: [AuthGuardService], component: MemberAnalysisComponent},
      { path: 'choose-member-register', component: ChooseMemberRegisterComponent},
      { path: 'member-regis-1', component: MemberRegistrationStep1Component},
      { path: 'member-regis-2', component: MemberRegistrationStep2Component},
      { path: 'member-regis-3', component: MemberRegistrationStep3Component},
      { path: 'member-regis-4', component: MemberRegistrationStep4Component},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class MemberRoutingModule {

}
