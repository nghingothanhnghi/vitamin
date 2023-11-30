import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaCenterRoutingModule } from './media-center-routing.module'

import { LiveBroadcastComponent } from './live-broadcast/live-broadcast.component';
import { LastBroadcastComponent } from './last-broadcast/last-broadcast.component';
import { ZoomLiveComponent } from './zoom-live/zoom-live.component';
import { NowApielgoComponent } from './now-apielgo/now-apielgo.component';
import { PipeModule } from '@app/pipes/pipe.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComponentsModule } from '@app/components/components.module';


@NgModule({
  declarations: [
    LiveBroadcastComponent,
    LastBroadcastComponent,
    ZoomLiveComponent,
    NowApielgoComponent,
  ],
  imports: [
    CommonModule,
    PipeModule,
    FormsModule,
    NgxPaginationModule,
    MediaCenterRoutingModule,
    ComponentsModule
  ],
  exports: [
    LiveBroadcastComponent,
    LastBroadcastComponent,
    ZoomLiveComponent,
    NowApielgoComponent,
  ]
})
export class MediaCenterModule { }
