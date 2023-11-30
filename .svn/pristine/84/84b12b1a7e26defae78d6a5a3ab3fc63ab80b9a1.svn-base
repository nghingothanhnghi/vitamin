import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@app/services/auth/auth-guard.service';
import { LiveBroadcastComponent } from './live-broadcast/live-broadcast.component';
import { LastBroadcastComponent } from './last-broadcast/last-broadcast.component';
import { ZoomLiveComponent } from './zoom-live/zoom-live.component';
import { NowApielgoComponent } from './now-apielgo/now-apielgo.component';

const routes: Routes = [
  {        
    path: '', 
    children: [
      { path: 'live-broadcasting', canActivate: [AuthGuardService], component: LiveBroadcastComponent},
      { path: 'last-broadcast', canActivate: [AuthGuardService], component: LastBroadcastComponent},
      { path: 'zoom-live', canActivate: [AuthGuardService], component: ZoomLiveComponent},
      { path: 'now-apielgo', canActivate: [AuthGuardService], component: NowApielgoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class MediaCenterRoutingModule {

}