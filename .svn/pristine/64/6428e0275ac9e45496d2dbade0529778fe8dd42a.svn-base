import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxLoadingModule } from 'ngx-loading';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { wAlertFeatureKey, wAlertReduercer } from './reducers/w-alert.reducer';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { itemFeatureKey, itemReduercer } from './reducers/item.reducer';
import { NoticeLayoutComponent } from './layout/notice-layout/notice-layout.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NoticeLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    NgxLoadingModule.forRoot({fullScreenBackdrop: true}), 

    StoreModule.forFeature(itemFeatureKey, itemReduercer),
    StoreModule.forFeature(wAlertFeatureKey, wAlertReduercer),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}