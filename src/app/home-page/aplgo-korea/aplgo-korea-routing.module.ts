import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { StoreComponent } from './store/store.component';
import { GlobalComponent } from './global/global.component';
import { GreetingComponent } from './greeting/greeting.component';
import { ManagementComponent } from './management/management.component';


const routes: Routes = [
  { 
    path: '', 
    children: [
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact', component: StoreComponent },
      { path: 'global', component: GlobalComponent },
      { path: 'greeting', component: GreetingComponent },
      { path: 'management', component: ManagementComponent },
      { path: 'store', component: StoreComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
  exports: [RouterModule]
})


export class AplgoKoreaRoutingModule {

}