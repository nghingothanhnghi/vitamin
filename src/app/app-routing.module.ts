import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { NoticeLayoutComponent } from './layout/notice-layout/notice-layout.component';
import { LoginSuccessfulComponent } from './login/login-successful/login-successful.component';
import { OsDoComponent } from './myoffice/os.do/os.do.component';
import { AuthGuardService } from './services/auth/auth-guard.service';

const appLayoutModule = () => import ("@app/layout/app-layout/app-layout.module").then(x => x.AppLayoutModule);
const reportLayoutModule = () => import ("@app/layout/report-layout/report-layout.module").then(x => x.ReportLayoutModule);

const routes: Routes = [
  { path: "", loadChildren: appLayoutModule },
  { path: "notice", component: NoticeLayoutComponent },
  { path: "report", canActivate: [AuthGuardService], loadChildren: reportLayoutModule },
  { path: "my-office/login-successful", canActivate: [AuthGuardService], component: LoginSuccessfulComponent },
  { path: "my-office/os.do",  component: OsDoComponent},
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
