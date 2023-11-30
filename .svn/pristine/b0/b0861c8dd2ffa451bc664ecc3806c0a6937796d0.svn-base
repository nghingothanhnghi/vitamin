import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { ForgotIdComponent } from './forgot-id/forgot-id.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginRoutingModule } from './login-routing.module';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { LoginSuccessfulComponent } from './login-successful/login-successful.component';
import { ComponentsModule } from '@app/components/components.module';
import { codeFeatureKey, codeReducer } from '@app/reducers/system/code.reducer';
import { CodeEffect } from '@app/effects/system/code.effect';



@NgModule({
  declarations: [
    LoginPageComponent,
    ForgotIdComponent,
    ForgotPasswordComponent,
    LoginSuccessfulComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ComponentsModule,
    FormsModule,
    StoreModule.forFeature(codeFeatureKey, codeReducer),
    EffectsModule.forFeature([CodeEffect])
  ]
})
export class LoginModule { }
