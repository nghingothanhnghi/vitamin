import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@homepage/header/header.component';
import { FooterComponent } from '@homepage/footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CompanyEffect } from '@effects/system/company.effect';
import { companyReducer, companyFeatureKey } from '@reducers/system/company.reducer';
import { HomePageComponent } from './home-page/home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { myProgramsFeatureKey, _myProgramReducer } from '@app/reducers/system/my-program.reducer';
import { MyProgramEffects } from '@app/effects/system/my-program.effect';
import { NgxLoadingModule } from 'ngx-loading';
import { overlayLoadingFeatureKey, overlayLoadingReducer } from '@app/reducers/overlay-loading.reducer';
import { AutologoutComponent } from './autologout/autologout.component';
import { PageHeadingComponent } from './page-heading/page-heading.component';
import { pageHeadingFeatureKey, pageHeadingReducer } from '@app/reducers/page-heading.reducer';
import { PipeModule } from '@app/pipes/pipe.module';
import { cartFeatureKey, cartReducer } from '@app/reducers/shoppingmall/cart.reducer';
import { CartEffect } from '@app/effects/shoppingmall/cart.effect';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
import { MainHeadingComponent } from './main-heading/main-heading.component';
import { HomeIndexModule } from './home-page/home-index.module';
import { FormsModule } from '@angular/forms';
import { codeFeatureKey, codeReducer } from '@app/reducers/system/code.reducer';
import { CodeEffect } from '@app/effects/system/code.effect';
import { ComponentsModule } from '@app/components/components.module';
import { pdtCateFeatureKey, pdtCateReducer } from '@app/reducers/shoppingmall/pdt-cate.reducer';
import { PdtCateEffect } from '@app/effects/shoppingmall/pdt-cate.effect';
import { memberPointFeatureKey, memberPointReducer } from '@app/reducers/shoppingmall/member-point.reducer';
import { MemberPointEffect } from '@app/effects/shoppingmall/member-point.effect';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    AutologoutComponent,
    PageHeadingComponent,
    MainSidebarComponent,
    MainHeadingComponent,
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    PipeModule,
    HomeIndexModule,
    FormsModule,
    ComponentsModule,
    NgxLoadingModule.forRoot({fullScreenBackdrop: true}), 
    StoreModule.forFeature(companyFeatureKey, companyReducer),
    StoreModule.forFeature(myProgramsFeatureKey, _myProgramReducer),
    StoreModule.forFeature(overlayLoadingFeatureKey, overlayLoadingReducer),
    StoreModule.forFeature(pageHeadingFeatureKey, pageHeadingReducer),
    StoreModule.forFeature(cartFeatureKey, cartReducer),
    StoreModule.forFeature(codeFeatureKey, codeReducer),
    StoreModule.forFeature(pdtCateFeatureKey, pdtCateReducer),
    StoreModule.forFeature(memberPointFeatureKey, memberPointReducer),
    EffectsModule.forFeature([CompanyEffect, MyProgramEffects, CartEffect, CodeEffect, PdtCateEffect, MemberPointEffect])
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageHeadingComponent,
    MainSidebarComponent,
    MainHeadingComponent,
  ]
})
export class HomePageModule { }
