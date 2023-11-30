import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { DashBoardRoutingModule } from './dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DashBoardEffect } from '@app/effects/myoffice/dashboard/dashboard.effects';
import { dashBoardFeatureKey, dashBoardReducer } from '@app/reducers/myoffice/dashboard/dashboard.reducer';
import { ComponentsModule } from '@app/components/components.module';
import { FormsModule } from '@angular/forms';
import { PipeModule } from '@app/pipes/pipe.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MemberBoxEffect } from '@app/effects/myoffice/member/member-box.effect';
import { memberBoxFeatureKey, memBoxReducer } from '@app/reducers/myoffice/member/member-box.reducer';
import { DirectiveModule } from '@app/directive/directive.module';


@NgModule({
  declarations: [  
    DashBoardComponent
  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    StoreModule.forFeature(dashBoardFeatureKey, dashBoardReducer),
    StoreModule.forFeature(memberBoxFeatureKey, memBoxReducer),
    EffectsModule.forFeature([DashBoardEffect,MemberBoxEffect]),
    ComponentsModule,
    NgxPaginationModule,
    FormsModule,
    PipeModule,
    DirectiveModule 

  ],
})
export class DashBoardModule { }
