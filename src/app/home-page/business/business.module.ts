import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessInforComponent } from './business-infor/business-infor.component';
import { PlanComponent } from './plan/plan.component';
import { HallOfFameComponent } from './hall-of-fame/hall-of-fame.component';
import { StoryComponent } from './story/story.component';
import { BusinessRoutingModule } from './business-routing.module';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { ComponentsModule } from '@app/components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BusinessInforComponent,
    PlanComponent,
    HallOfFameComponent,
    StoryComponent,
    StoryDetailsComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    NgxPaginationModule,
    BusinessRoutingModule,
    FormsModule
  ],
  exports: [
    BusinessInforComponent,
    PlanComponent,
    HallOfFameComponent,
    StoryComponent,
    StoryDetailsComponent
  ]
})
export class BusinessModule { }
