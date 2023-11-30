import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ChangeResidentIdComponent } from './change-resident-id/change-resident-id.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { changePerInforReducer ,changePerInforFeatureKey} from '@app/reducers/myoffice/user-profile/change-personal-information.reducer';
import { ChangePerInfoEffect } from '@app/effects/myoffice/user-profile/change-personal-information.effects';

import { userProReducer ,userProfileFeatureKey} from '@app/reducers/myoffice/user-profile/user-profile.reducer';
import { UserProfileEffect } from '@app/effects/myoffice/user-profile/user-profile.effects';

import { changeResidentIdReducer ,changeResidentIdFeatureKey} from '@app/reducers/myoffice/user-profile/change-resident-id.reducer';
import { ChangeResidentIdEffect } from '@app/effects/myoffice/user-profile/change-resident-id.effects';

import { changePassWordReducer ,changePassFeatureKey} from '@app/reducers/myoffice/user-profile/change-password.reducer';
import { ChangePassEffect } from '@app/effects/myoffice/user-profile/change-password.effects';
import { ChangePersonalInformationComponent } from './change-personal-information/change-personal-information.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { memberRegistFeatureKey, memRegistReducer } from '@app/reducers/myoffice/member/member-regist.reducer';
import { MemberRegistEffect } from '@app/effects/myoffice/member/member-regist.effect';
import { VitaminPayComponent } from './vitamin-pay/vitamin-pay.component';




@NgModule({
  declarations: [
    UserProfileComponent,
    ChangePersonalInformationComponent,
    ChangeResidentIdComponent,
    ChangePasswordComponent,
    PersonalInformationComponent,
    VitaminPayComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ComponentsModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,

    StoreModule.forFeature(changePassFeatureKey, changePassWordReducer), 
    EffectsModule.forFeature([ChangePassEffect]),

    StoreModule.forFeature(userProfileFeatureKey, userProReducer), 
    EffectsModule.forFeature([UserProfileEffect]),

    StoreModule.forFeature(changeResidentIdFeatureKey, changeResidentIdReducer), 
    EffectsModule.forFeature([ChangeResidentIdEffect]),

    StoreModule.forFeature(changePerInforFeatureKey,changePerInforReducer), 
    EffectsModule.forFeature([ChangePerInfoEffect]),
    StoreModule.forFeature(memberRegistFeatureKey, memRegistReducer),
    EffectsModule.forFeature([MemberRegistEffect]),
    
  ]
})
export class UserProfileModule { }
