import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeComponent } from './notice/notice.component';
import { QnaComponent } from './qna/qna.component';
import { NoticeRoutingModule } from './notice-routing.module';
import { ComponentsModule } from '@app/components/components.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { noticeSearchFeatureKey, noticeSearchReducer } from '@app/reducers/myoffice/notice/notice.reducer';
import { NoticeEffect } from '@app/effects/myoffice/notice/notice.effects';
import { qnaSearchFeatureKey, qnaSearchReducer } from '@app/reducers/myoffice/notice/qna.reducer';
import { QnaEffect } from '@app/effects/myoffice/notice/qna.effects';
import { FaqComponent } from './faq/faq.component';
import { faqSearchFeatureKey, faqSearchReducer } from '@app/reducers/myoffice/notice/faq.reducer';
import { FaqEffect } from '@app/effects/myoffice/notice/faq.effects';
import { NoticeDetailComponent } from './notice-detail/notice-detail.component';
import { detailNoticeReducer, noticeDetailFeatureKey } from '@app/reducers/myoffice/notice/notice-detail.reducer';
import { CustomerConsultationGuideComposingComponent } from './customer-consultation-guide-composing/customer-consultation-guide-composing.component';
import { CustomerConsultationGuideDetailComponent } from './customer-consultation-guide-detail/customer-consultation-guide-detail.component';
import { PipeModule } from '@app/pipes/pipe.module';
import { AsvNoticeComponent } from './asv-notice/asv-notice/asv-notice.component';
import { AsvNoticeDetailComponent } from './asv-notice/asv-notice-detail/asv-notice-detail.component';
import { ArchivesComponent } from './archives/archives/archives.component';
import { BoardDetailComponent } from './board-detail/board-detail.component';
import { ScheduleComponent } from '../schedule/schedule/schedule.component';
import { ScheduleTableComponent } from '../schedule/schedule/schedule-table/schedule-table.component';
import { ScheduleDetailComponent } from '../schedule/schedule-detail/schedule-detail.component';
import { scheduleSearchFeatureKey, scheduleSearchReducer } from '@app/reducers/myoffice/schedule/schedule.reducer';
import { ScheduleEffect } from '@app/effects/myoffice/schedule/schedule.effect';



@NgModule({
  declarations: [
    NoticeComponent,
    QnaComponent,
    FaqComponent,
    NoticeDetailComponent,
    CustomerConsultationGuideComposingComponent,
    CustomerConsultationGuideDetailComponent,
    AsvNoticeComponent,
    AsvNoticeDetailComponent,
    ArchivesComponent,
    BoardDetailComponent,
    ScheduleComponent,
    ScheduleTableComponent,
    ScheduleDetailComponent
  ],
  imports: [
    CommonModule,
    NoticeRoutingModule,
    ComponentsModule,
    PipeModule,
    StoreModule.forFeature(noticeSearchFeatureKey, noticeSearchReducer), // notice
    EffectsModule.forFeature([NoticeEffect]),
    StoreModule.forFeature(noticeDetailFeatureKey, detailNoticeReducer), // notice detail
    EffectsModule.forFeature([NoticeEffect]),
    StoreModule.forFeature(qnaSearchFeatureKey, qnaSearchReducer), // qna
    EffectsModule.forFeature([QnaEffect]),
    StoreModule.forFeature(qnaSearchFeatureKey, qnaSearchReducer), // detail qna
    EffectsModule.forFeature([QnaEffect]),
    StoreModule.forFeature(faqSearchFeatureKey, faqSearchReducer), // faq
    EffectsModule.forFeature([FaqEffect]),
    StoreModule.forFeature(scheduleSearchFeatureKey, scheduleSearchReducer), // schedule
    EffectsModule.forFeature([ScheduleEffect]),
    FormsModule,
    NgxPaginationModule
  ]
})
export class NoticeModule { }
