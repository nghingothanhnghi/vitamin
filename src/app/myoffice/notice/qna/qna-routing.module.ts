import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerConsultationGuideComposingComponent } from './customer-consultation-guide-composing/customer-consultation-guide-composing.component';


const routes: Routes = [
  { path: 'customer-consultation-guide-composing', component: CustomerConsultationGuideComposingComponent },
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class QnaRoutingModule { }
