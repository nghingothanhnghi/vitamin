import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MyofficeHomeComponent } from './myoffice-home/myoffice-home.component';
import { MyofficeRoutingModule } from './myoffice-routing.module';

import { CodeEffect } from '@app/effects/system/code.effect';
import { codeFeatureKey, codeReducer } from '@app/reducers/system/code.reducer';
import { rankFeatureKey, rankReducer } from '@app/reducers/system/rank.reducer';
import { CenterEffect } from '@app/effects/system/center.effect';
import { RankEffect } from '@app/effects/system/rank.effect';
import { centerFeatureKey, centerReducer } from '@app/reducers/system/center.reducer';
import { izexFeatureKey, izexReducer } from '@app/reducers/system/izex.reducer';
import { BenefitReportEffect } from '@app/effects/myoffice/benefit/benefit-report.effects';
import { IzexEffects } from '@app/effects/system/izex.effect';
import { OsDoComponent } from './os.do/os.do.component';
import { ComponentsModule } from '@app/components/components.module';


@NgModule({
  declarations: [  
    MyofficeHomeComponent, OsDoComponent
  ],
  imports: [
    CommonModule,
    MyofficeRoutingModule,
    ComponentsModule,
    StoreModule.forFeature(codeFeatureKey, codeReducer),
    StoreModule.forFeature(centerFeatureKey, centerReducer),
    StoreModule.forFeature(rankFeatureKey, rankReducer),
    StoreModule.forFeature(izexFeatureKey, izexReducer),
    EffectsModule.forFeature([CodeEffect, CenterEffect, RankEffect,BenefitReportEffect, IzexEffects])
  ],
})
export class MyofficeModule { }
