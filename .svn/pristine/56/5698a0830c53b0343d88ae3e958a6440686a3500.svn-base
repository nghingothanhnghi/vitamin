import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BusinessInforComponent } from './business-infor/business-infor.component';
import { PlanComponent } from './plan/plan.component';
import { HallOfFameComponent } from './hall-of-fame/hall-of-fame.component';
import { StoryComponent } from './story/story.component';
import { StoryDetailsComponent } from './story-details/story-details.component';


const routes: Routes = [
  {
    path: '', 
    children: [
      { path: 'business-info', component: BusinessInforComponent },
      { path: 'plan', component: PlanComponent },
      { path: 'hall-of-fame', component: HallOfFameComponent },
      { path: 'story', component: StoryComponent },
      { path: 'story-details', component: StoryDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
