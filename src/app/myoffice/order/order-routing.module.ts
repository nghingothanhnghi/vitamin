import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderCalendarComponent } from './order-calendar/order-calendar.component';
import { MonthlyOrderCountComponent } from './monthly-order-count/monthly-order-count.component';
import { OrderMileageInquiryComponent } from './order-mileage-inquiry/order-mileage-inquiry.component';
import { OrderProductSearchComponent } from './order-product-search/order-product-search.component';
import { OrderSearchComponent } from './order-search/order-search.component';
import { SubOrderSearchComponent } from './sub-order-search/sub-order-search.component';
import { OrderDetailsInquiryComponent } from './order-details-inquiry/order-details-inquiry.component';
import { PerformanceInquiryByLegComponent } from './performance-inquiry-by-leg/performance-inquiry-by-leg.component';

const routes: Routes = [
  { 
    path: '', 
    children: [
      { path: 'order-search', component: OrderSearchComponent },
      { path: 'sub-order-search', component: SubOrderSearchComponent },
      { path: 'order-product-search', component: OrderProductSearchComponent },
      { path: 'order-details-inquiry', component: OrderDetailsInquiryComponent },
      { path: 'order-calendar', component: OrderCalendarComponent },
      { path: 'monthly-order-count', component: MonthlyOrderCountComponent },
      { path: 'order-mileage-inquiry', component: OrderMileageInquiryComponent },
      { path: 'performance-inquiry-by-leg', component: PerformanceInquiryByLegComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {

}
