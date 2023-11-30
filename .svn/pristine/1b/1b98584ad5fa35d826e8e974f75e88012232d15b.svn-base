import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { OrderRoutingModule } from './order-routing.module';
import { OrderSearchComponent } from './order-search/order-search.component';
import { SubOrderSearchComponent } from './sub-order-search/sub-order-search.component';
import { SubOrderSearchModule } from './sub-order-search/sub-order-search.module';
import { OrderSearchModule } from './order-search/order-search.module';
import { OrderProductSearchModule } from './order-product-search/order-product-search.module';
import { OrderProductSearchComponent } from './order-product-search/order-product-search.component';

import { orderSearchFeatureKey } from '@app/reducers/myoffice/order/order-search.reducer';
import { orderSearchReducer } from '@app/reducers/myoffice/order/order-search.reducer';
import { OrderSearchEffect } from '@app/effects/myoffice/order/order-search.effect';
import { orderProductSearchFeatureKey } from '@app/reducers/myoffice/order/order-product-search.reducer';
import { orderProductSearchReducer } from '@app/reducers/myoffice/order/order-product-search.reducer';
import { OrderProductSearchEffect } from '@app/effects/myoffice/order/order-product-search.effect';
import { OrderCalendarModule } from './order-calendar/order-calendar.module';
import { OrderCalendarComponent } from './order-calendar/order-calendar.component';
import { orderCalendarFeatureKey, orderCalendarReducer } from '@app/reducers/myoffice/order/order-calendar.reducer';
import { OrderCalendarEffect } from '@app/effects/myoffice/order/order-calendar.effect';
import { MonthlyOrderCountComponent } from './monthly-order-count/monthly-order-count.component';
import { MonthlyOrderCountModule } from './monthly-order-count/monthly-order-count.module';
import { OrderMileageInquiryComponent } from './order-mileage-inquiry/order-mileage-inquiry.component';
import { OrderMileageInquiryModule } from './order-mileage-inquiry/order-mileage-inquiry.module';
import { monthlyOrderCountFeatureKey, monthlyOrderCountReducer } from '@app/reducers/myoffice/order/monthly-order-count.reducer';
import { MonthlyOrderCountEffect } from '@app/effects/myoffice/order/monthly-order-count.effect';
import { orderMileageInquiryFeatureKey, orderMileageInquiryReducer } from '@app/reducers/myoffice/order/order-mileage-inquiry.reducer';
import { OrderMileageInquiryEffect } from '@app/effects/myoffice/order/order-mileage-inquiry.effect';
import { OrderDetailsInquiryComponent } from './order-details-inquiry/order-details-inquiry.component';
import { OrderDetailsInquiryModule } from './order-details-inquiry/order-details-inquiry.module';
import { orderDetailInquiryFeatureKey, orderDetailInquiryReducer } from '@app/reducers/myoffice/order/order-detail-inquiry.reducer';
import { OrderDetailInquiryEffect } from '@app/effects/myoffice/order/order-detail-inquiry.effect';
import { orderPopupFeatureKey, orderPopupReducer } from '@app/reducers/myoffice/order/order-popup.reducer';
import { OrderPopupEffect } from '@app/effects/myoffice/order/order-popup.effect';
import { DirectiveModule } from '@app/directive/directive.module';
import { ComponentsModule } from '@app/components/components.module';
import { PerformanceInquiryByLegComponent } from './performance-inquiry-by-leg/performance-inquiry-by-leg.component';
import { TranslateModule } from '@ngx-translate/core';
import { PipeModule } from '@app/pipes/pipe.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { inquiryPerformanceSearchFeatureKey, inquiryPerformanceSearchReducer } from '@app/reducers/myoffice/order/inquiry-performance-search.reducer';
import { memberPositionFeatureKey, memPositionReducer } from '@app/reducers/myoffice/member/member-position.reducer';
import { MemberInforPositionEffect } from '@app/effects/myoffice/member/member-inquiry-position.effect';
import { InquiryPerformanceSearchEffect } from '@app/effects/myoffice/order/inquiry-performence-search.effect';

@NgModule({
  declarations: [
    OrderSearchComponent,
    SubOrderSearchComponent,
    OrderProductSearchComponent,
    OrderDetailsInquiryComponent,
    OrderCalendarComponent,
    MonthlyOrderCountComponent,
    OrderMileageInquiryComponent,
    PerformanceInquiryByLegComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    OrderSearchModule,
    SubOrderSearchModule,
    OrderProductSearchModule,
    OrderDetailsInquiryModule,
    OrderCalendarModule,
    MonthlyOrderCountModule,
    OrderMileageInquiryModule,
    OrderRoutingModule,
    TranslateModule,
    PipeModule,
    NgxPaginationModule,
    FormsModule,

    DirectiveModule,

    StoreModule.forFeature(orderSearchFeatureKey, orderSearchReducer),
    StoreModule.forFeature(orderProductSearchFeatureKey, orderProductSearchReducer),
    StoreModule.forFeature(orderCalendarFeatureKey, orderCalendarReducer),
    StoreModule.forFeature(monthlyOrderCountFeatureKey, monthlyOrderCountReducer),
    StoreModule.forFeature(orderMileageInquiryFeatureKey, orderMileageInquiryReducer),
    StoreModule.forFeature(orderDetailInquiryFeatureKey, orderDetailInquiryReducer),
    StoreModule.forFeature(orderPopupFeatureKey, orderPopupReducer),
    StoreModule.forFeature(inquiryPerformanceSearchFeatureKey, inquiryPerformanceSearchReducer),
    StoreModule.forFeature(memberPositionFeatureKey, memPositionReducer),


    EffectsModule.forFeature([
      OrderSearchEffect, 
      OrderProductSearchEffect,
      OrderCalendarEffect, 
      MonthlyOrderCountEffect, 
      OrderMileageInquiryEffect,
      OrderDetailInquiryEffect,
      OrderPopupEffect,
      InquiryPerformanceSearchEffect,
      MemberInforPositionEffect
    ]),
  ]
})
export class OrderModule { }
