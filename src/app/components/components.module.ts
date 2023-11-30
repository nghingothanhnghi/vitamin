import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';

import { DateTimeFilterComponent } from './date-time-filter/date-time-filter.component';
import { DateSelectDropdownComponent } from './date-select-dropdown/date-select-dropdown.component';
import { SelectDropdownComponent } from './select-dropdown/select-dropdown.component';
import { PagingComponent } from './paging/paging.component';
import { GridNoDataMobileComponent } from './grid-no-data-mobile/grid-no-data-mobile.component';
import { DateTimeFilterMobileComponent } from './date-time-filter-mobile/date-time-filter-mobile.component';
import { DirectiveModule } from '@app/directive/directive.module';
import { MemberPopupComponent } from './member-popup/member-popup.component';
import { memberPopupFeatureKey, memberPopupReducer } from '@app/reducers/myoffice/member/member-popup.reducer';
import { zipPopupFeatureKey, zipPopupReducer } from '@app/reducers/system/zip-popup.reducer';
import { MemberPopupEffect } from '@app/effects/myoffice/member/member-popup.effect';
import { ZipPopupEffect } from '@app/effects/system/zip.effect';
import { ZipPopupComponent } from './zip-popup/zip-popup.component';
import { ProductsComponent } from './products/products.component';
import { PipeModule } from '@app/pipes/pipe.module';
import { WAlertComponent } from './w-alert/w-alert.component';
import { ProductPopupComponent } from './product-popup/product-popup.component';
import { ItemComponent } from './item/item/item.component';
import { productFeatureKey, productReducer } from '@app/reducers/shoppingmall/product.reducer';
import { pdtDetailFeatureKey, pdtDetailReducer } from '@app/reducers/shoppingmall/pdt-detail.reducer';
import { ProductEffect } from '@app/effects/shoppingmall/product.effect';
import { PdtDetailEffect } from '@app/effects/shoppingmall/pdt-detail.effect';
import { LoginResultComponent } from './login-result/login-result.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DateTimeFilterComponent,
    DateSelectDropdownComponent,
    SelectDropdownComponent,
    PagingComponent,
    GridNoDataMobileComponent,
    DateTimeFilterMobileComponent,
    MemberPopupComponent,
    ZipPopupComponent,
    ProductsComponent,
    WAlertComponent,
    ProductPopupComponent,
    ItemComponent,
    LoginResultComponent,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    PipeModule,
    DirectiveModule,
    TranslateModule,
    StoreModule.forFeature(memberPopupFeatureKey, memberPopupReducer),
    StoreModule.forFeature(zipPopupFeatureKey, zipPopupReducer),
    EffectsModule.forFeature([MemberPopupEffect]),
    EffectsModule.forFeature([ZipPopupEffect]),
    StoreModule.forFeature(productFeatureKey, productReducer),
    StoreModule.forFeature(pdtDetailFeatureKey, pdtDetailReducer),
    EffectsModule.forFeature([
      ProductEffect,
      PdtDetailEffect
    ]),
  ],
  exports: [
    DateTimeFilterComponent,
    DateSelectDropdownComponent,
    SelectDropdownComponent,
    PagingComponent,
    GridNoDataMobileComponent,
    DateTimeFilterMobileComponent,
    MemberPopupComponent,
    ZipPopupComponent,
    ProductsComponent,
    WAlertComponent,
    ProductPopupComponent,
    ItemComponent,
    LoginResultComponent,
  ],
})
export class ComponentsModule { }
