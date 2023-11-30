import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ComponentsModule } from '@app/components/components.module';
import { ScheduleTableComponent } from './schedule/schedule-table/schedule-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from '@app/pipes/pipe.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { scheduleSearchFeatureKey, scheduleSearchReducer } from '@app/reducers/myoffice/schedule/schedule.reducer';
import { ScheduleEffect } from '@app/effects/myoffice/schedule/schedule.effect';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';



@NgModule({
  declarations: [
    // ScheduleComponent,
    // ScheduleTableComponent,
    // ScheduleDetailComponent,
  ],
  imports: [
    // CommonModule,
    // ScheduleRoutingModule,
    // ComponentsModule,
    // StoreModule.forFeature(scheduleSearchFeatureKey, scheduleSearchReducer), // schedule
    // EffectsModule.forFeature([ScheduleEffect]),
    // NgxPaginationModule,
    // PipeModule,
  ]
})
export class ScheduleModule { }
