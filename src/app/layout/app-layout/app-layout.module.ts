import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutRoutingModule } from './app-layout-routing.module';
import { AppLayoutComponent } from './app-layout.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { login2SearchFeatureKey, login2SearchReducer } from '@app/reducers/system/login2.reducer';
import { LoginEffect2 } from '@app/effects/system/login2.effect';
import { smWownetFeatureKey, smWownetReducer } from '@app/reducers/system/sm-wownet.reducer';
import { SmWownetEffect } from '@app/effects/system/sm-wownet.effect';
import { HomePageModule } from '@app/home-page/home-page.module';
import { ComponentsModule } from '@app/components/components.module';

@NgModule({
  declarations: [
    AppLayoutComponent
  ],
  imports: [
    CommonModule,
    AppLayoutRoutingModule,
    HomePageModule,
    ComponentsModule,
    
    StoreModule.forFeature(login2SearchFeatureKey, login2SearchReducer),
    StoreModule.forFeature(smWownetFeatureKey, smWownetReducer),
    EffectsModule.forFeature([LoginEffect2, SmWownetEffect]),
  ]
})
export class AppLayoutModule { }
