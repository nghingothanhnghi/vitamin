import { MemberBenefitModel } from '@app/models/myoffice/benefit/member-benefit.module';
import { OrderHistoryModel } from '@app/models/myoffice/benefit/order-history.module';
import { PayPrintModel } from '@app/models/myoffice/benefit/pay-print.module';
import { WitholdingTaxModel } from '@app/models/myoffice/benefit/witholding-tax.module';
import { createAction, props } from '@ngrx/store';


//find-days
export const getSelectDate = createAction(
  "[Benefit API] get select date of benefit statement",
  props<{ params: any }>()
);

export const getSelectDateSuccess = createAction(
  "[Benefit API] get select date of benefit statement success",
  props<{ benefit: String[] }>()
);

export const getSelectDateFailure = createAction(
  "[Benefit API] get select date of benefit statement failure",
  props<{ msg: any }>()
);

//grid-pay-print
export const searchFindPayPrint = createAction(
"[Benefit API] search find pay print",
props<{ params: any }>()
);

export const searchFindPayPrintSuccess = createAction(
"[Benefit API] search find pay print success",
props<{ benefit: PayPrintModel[] }>()
);

export const searchFindPayPrintFailure = createAction(
"[Benefit API] search find pay print failure",
props<{ msg: any }>()
);

// grid-pay-history
export const searchFindPayHistory = createAction(
"[Benefit API] search find pay history",
props<{ params: any }>()
);

export const searchFindPayHistorySuccess = createAction(
"[Benefit API] search find pay history success",
props<{ benefit: PayPrintModel[] }>()
);

export const searchFindPayHistoryFailure = createAction(
"[Benefit API] search find pay history failure",
props<{ msg: any }>()
);

//grid-order-history
 //Search
export const searchFindOrderHistory = createAction(
"[Benefit API] search find order history",
props<{ params: any }>()
);

export const searchFindOrderHistorySuccess = createAction(
"[Benefit API] search find order history success",
props<{ benefit: OrderHistoryModel[] }>()
);

export const searchFindOrderHistoryFailure = createAction(
"[Benefit API] search find order history failure",
props<{ msg: any }>()
);

// sum
export const sumFindOrderHistory = createAction(
"[Benefit API] sum find order history",
props<{ params: any }>()
);

export const sumFindOrderHistorySuccess = createAction(
"[Benefit API] sum find order history success",
props<{ benefit: OrderHistoryModel }>()
);

export const sumFindOrderHistoryFailure = createAction(
"[Benefit API] sum find order history failure",
props<{ msg: any }>()
);

//grid-order-product-history
//Search
export const searchFindOrderProductHistory = createAction(
"[Benefit API] search find order product history",
props<{ params: any }>()
);

export const searchFindOrderProductHistorySuccess = createAction(
"[Benefit API] search find order product history success",
props<{ benefit: OrderHistoryModel[] }>()
);

export const searchFindOrderProductHistoryFailure = createAction(
"[Benefit API] search find order product history failure",
props<{ msg: any }>()
);

// sum
export const sumFindOrderProductHistory = createAction(
"[Benefit API] sum find order product history",
props<{ params: any }>()
);

export const sumFindOrderProductHistorySuccess = createAction(
"[Benefit API] sum find order product history success",
props<{ benefit: OrderHistoryModel }>()
);

export const sumFindOrderProductHistoryFailure = createAction(
"[Benefit API] sum find order product history failure",
props<{ msg: any }>()
);

//member-info
export const getMemberInfo = createAction(
"[Benefit API] get member info",
props<{ params: any }>()
);

export const getMemberInfoSuccess = createAction(
"[Benefit API] get member info success",
props<{ member: MemberBenefitModel }>()
);

export const getMemberInfoFailure = createAction(
"[Benefit API] get member info failure",
props<{ msg: any }>()
);