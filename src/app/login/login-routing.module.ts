import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotIdComponent } from './forgot-id/forgot-id.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginPageComponent } from './login-page/login-page.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {path: '', component: LoginPageComponent},
            {path: 'forgot-id', component: ForgotIdComponent},
            {path: 'forgot-passwd', component: ForgotPasswordComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LoginRoutingModule{

}