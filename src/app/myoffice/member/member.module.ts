import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MemberSearchComponent } from './member-search/member-search.component';
import { MemberInformationInquiryComponent } from './member-information-inquiry/member-information-inquiry.component';
import { MemberRoutingModule } from './member-routing.module';
import { MemberSearchModule } from './member-search/member-search.module';
import { memberPopupFeatureKey, memberPopupReducer} from '@reducers/myoffice/member/member-popup.reducer';
import { memberInfoInquiryFeatureKey, memInfoInquiryReducer} from '@reducers/myoffice/member/member-infor-inquiry.reducer';
import { memberSearchFeatureKey, memSearchReducer } from '@reducers/myoffice/member/member-search.reducer';
import { memberPositionFeatureKey, memPositionReducer } from '@reducers/myoffice/member/member-position.reducer';
import { memberLineFeatureKey, memLineReducer } from '@reducers/myoffice/member/member-line.reducer';
import { memberBoxFeatureKey, memBoxReducer } from '@reducers/myoffice/member/member-box.reducer';
import { memberAnalysisFeatureKey, memAnalysisReducer } from '@reducers/myoffice/member/member-analysis.reducer';
import { bankFeatureKey, bankReducer } from '@reducers/system/bank.reducer';
import { countryFeatureKey, countryReducer } from '@reducers/system/country.reducer';
import { verifyFeatureKey, verifyReducer } from '@reducers/system/verify.reducer';
import { memberRegistFeatureKey, memRegistReducer } from '@reducers/myoffice/member/member-regist.reducer';

import { MemberInforInquiryEffect } from '@effects/myoffice/member/member-infor-inquiry.effect';
import { MemberSearchEffect } from '@effects/myoffice/member/member-search.effect';
import { MemberInforPositionEffect } from '@effects/myoffice/member/member-inquiry-position.effect';
import { MemberLineEffect } from '@effects/myoffice/member/member-line.effect';
import { MemberBoxEffect } from '@effects/myoffice/member/member-box.effect';
import { MemberAnalysisEffect } from '@effects/myoffice/member/member-analysis.effect';
import { MemberRegistEffect } from '@effects/myoffice/member/member-regist.effect';
import { MemberPopupEffect } from '@effects/myoffice/member/member-popup.effect';
import { BankEffect } from '@effects/system/bank.effect';
import { CountryEffects } from '@effects/system/country.effect';
import { VerifyEffect } from '@effects/system/verify.effect';

import { MemberPositionComponent } from './member-position/member-position.component';
import { MemberLineComponent } from './member-line/member-line.component';
import { MemberBoxComponent } from './member-box/member-box.component';
import { MemberAnalysisComponent } from './member-analysis/member-analysis.component';
import { MemberRegistrationStep1Component } from './member-registration-step1/member-registration-step1.component';
import { MemberRegistrationStep2Component } from './member-registration-step2/member-registration-step2.component';
import { MemberRegistrationStep3Component } from './member-registration-step3/member-registration-step3.component';
import { ComponentsModule } from '@app/components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from '@app/pipes/pipe.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@app/directive/directive.module';
import { ChooseMemberRegisterComponent } from './choose-member-register/choose-member-register.component';
import { NgxLoadingModule } from 'ngx-loading';
import { MemberInquiryByLegComponent } from './member-inquiry-by-leg/member-inquiry-by-leg.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MemberSearchComponent,
    MemberInformationInquiryComponent,
    MemberPositionComponent,
    MemberLineComponent,
    MemberBoxComponent,
    MemberAnalysisComponent,
    MemberRegistrationStep1Component,
    MemberRegistrationStep2Component,
    MemberRegistrationStep3Component,
    ChooseMemberRegisterComponent,
    MemberInquiryByLegComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MemberRoutingModule,
    MemberSearchModule,
    NgxPaginationModule,
    PipeModule,
    GoogleChartsModule,
    FormsModule,
    DirectiveModule,
    TranslateModule,
    StoreModule.forFeature(memberPopupFeatureKey, memberPopupReducer),
    StoreModule.forFeature(memberInfoInquiryFeatureKey, memInfoInquiryReducer),
    StoreModule.forFeature(memberSearchFeatureKey, memSearchReducer),
    StoreModule.forFeature(memberPositionFeatureKey, memPositionReducer),
    StoreModule.forFeature(memberLineFeatureKey, memLineReducer),
    StoreModule.forFeature(memberBoxFeatureKey, memBoxReducer),
    StoreModule.forFeature(memberAnalysisFeatureKey, memAnalysisReducer),
    StoreModule.forFeature(bankFeatureKey, bankReducer),
    StoreModule.forFeature(countryFeatureKey, countryReducer),
    StoreModule.forFeature(verifyFeatureKey, verifyReducer),
    StoreModule.forFeature(memberRegistFeatureKey, memRegistReducer),
    NgxLoadingModule.forRoot({fullScreenBackdrop: true}), 
    EffectsModule.forFeature([MemberInforInquiryEffect]),
    EffectsModule.forFeature([MemberSearchEffect]),
    EffectsModule.forFeature([MemberInforPositionEffect]),
    EffectsModule.forFeature([MemberLineEffect]),
    EffectsModule.forFeature([MemberBoxEffect]),
    EffectsModule.forFeature([MemberAnalysisEffect]),
    EffectsModule.forFeature([MemberRegistEffect]),
    EffectsModule.forFeature([BankEffect]),
    EffectsModule.forFeature([CountryEffects]),
    EffectsModule.forFeature([MemberPopupEffect]),
    EffectsModule.forFeature([VerifyEffect])
  ],
  exports: [
   // MemberPositionComponent,
  ]
})
export class MemberModule { }
