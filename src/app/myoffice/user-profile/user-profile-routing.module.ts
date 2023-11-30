import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePersonalInformationComponent } from './change-personal-information/change-personal-information.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeResidentIdComponent } from './change-resident-id/change-resident-id.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { VitaminPayComponent } from './vitamin-pay/vitamin-pay.component';
const routes: Routes = [
    { path: 'personal-information', component: PersonalInformationComponent },
    { path: 'change-personal-information', component: ChangePersonalInformationComponent },
    { path: 'change-password', component: ChangePasswordComponent },
    { path: 'change-resident-id', component: ChangeResidentIdComponent },
    { path: 'vitamin-pay', component: VitaminPayComponent },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserProfileRoutingModule {

}