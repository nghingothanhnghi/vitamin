import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticeComponent } from './notice/notice.component';
import { QnaComponent } from './qna/qna.component';
import { FaqComponent } from './faq/faq.component';
import { NoticeDetailComponent } from './notice-detail/notice-detail.component';
import { CustomerConsultationGuideComposingComponent } from './customer-consultation-guide-composing/customer-consultation-guide-composing.component';
import { CustomerConsultationGuideDetailComponent } from './customer-consultation-guide-detail/customer-consultation-guide-detail.component';
import { AsvNoticeComponent } from './asv-notice/asv-notice/asv-notice.component';
import { AsvNoticeDetailComponent } from './asv-notice/asv-notice-detail/asv-notice-detail.component';
import { ArchivesComponent } from './archives/archives/archives.component';
import { ScheduleComponent } from '../schedule/schedule/schedule.component';
import { ScheduleDetailComponent } from '../schedule/schedule-detail/schedule-detail.component';


const routes: Routes = [
  { path: 'notice', component: NoticeComponent },
  { path: 'notice-detail', component: NoticeDetailComponent },
  { path: 'qna', component: QnaComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'customer-consultation-guide-composing', component: CustomerConsultationGuideComposingComponent },
  { path: 'customer-consultation-guide-detail', component: CustomerConsultationGuideDetailComponent },
  { path: 'asv-notice', component: AsvNoticeComponent },
  { path: 'asv-notice-detail', component: AsvNoticeDetailComponent },
  { path: 'archives', component: ArchivesComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'schedule-detail', component: ScheduleDetailComponent },
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class NoticeRoutingModule { }
