import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BenefitSatementService } from '@app/services/myoffice/benefit/benefit-statement.service';
import { getMemberInfo, getMemberInfoFailure, getMemberInfoSuccess, getSelectDate, getSelectDateFailure, getSelectDateSuccess, searchFindOrderHistory, searchFindOrderHistoryFailure, searchFindOrderHistorySuccess, searchFindOrderProductHistory, searchFindOrderProductHistoryFailure, searchFindOrderProductHistorySuccess, searchFindPayHistory, searchFindPayHistoryFailure, searchFindPayHistorySuccess, searchFindPayPrint, searchFindPayPrintFailure, searchFindPayPrintSuccess, sumFindOrderHistory, sumFindOrderHistoryFailure, sumFindOrderHistorySuccess, sumFindOrderProductHistory, sumFindOrderProductHistoryFailure, sumFindOrderProductHistorySuccess } from '@app/actions/myoffice/benefit/benefit-statement.action';


@Injectable()
export class BenefitStatementEffect {

  constructor(
    private actions$: Actions,
    private benefitSatementService: BenefitSatementService
  ) { }

  //find-days
  getSelectDate$ = createEffect(() => this.actions$.pipe(
    ofType(getSelectDate),
    mergeMap(({ params }) => this.benefitSatementService.getSelectDate(params).pipe(
      map(res => getSelectDateSuccess({ benefit: res })),
      catchError(msg => of(getSelectDateFailure({ msg: msg })))
    ))
  ));

  //grid-pay-print
  searchFindPayPrint$ = createEffect(() => this.actions$.pipe(
    ofType(searchFindPayPrint),
    mergeMap(({ params }) => this.benefitSatementService.searchFindPayPrint(params).pipe(
      map(res => searchFindPayPrintSuccess({ benefit: res })),
      catchError(msg => of(searchFindPayPrintFailure({ msg: msg })))
    ))
  ));

  // grid-pay-history
  searchFindPayHistory$ = createEffect(() => this.actions$.pipe(
    ofType(searchFindPayHistory),
    mergeMap(({ params }) => this.benefitSatementService.searchFindPayHistory(params).pipe(
      map(res => searchFindPayHistorySuccess({ benefit: res })),
      catchError(msg => of(searchFindPayHistoryFailure({ msg: msg })))
    ))
  ));

  //grid-order-history
  searchFindOrderHistory$ = createEffect(() => this.actions$.pipe(
    ofType(searchFindOrderHistory),
    mergeMap(({ params }) => this.benefitSatementService.searchFindOrderHistory(params).pipe(
      map(res => searchFindOrderHistorySuccess({ benefit: res })),
      catchError(msg => of(searchFindOrderHistoryFailure({ msg: msg })))
    ))
  ));

  sumFindOrderHistory$ = createEffect(() => this.actions$.pipe(
    ofType(sumFindOrderHistory),
    mergeMap(({ params }) => this.benefitSatementService.sumFindOrderHistory(params).pipe(
      map(res => sumFindOrderHistorySuccess({ benefit: res })),
      catchError(msg => of(sumFindOrderHistoryFailure({ msg: msg })))
    ))
  ));

   //grid-order-product-history
   searchFindOrderProductHistory$ = createEffect(() => this.actions$.pipe(
    ofType(searchFindOrderProductHistory),
    mergeMap(({ params }) => this.benefitSatementService.searchFindOrderProductHistory(params).pipe(
      map(res => searchFindOrderProductHistorySuccess({ benefit: res })),
      catchError(msg => of(searchFindOrderProductHistoryFailure({ msg: msg })))
    ))
  ));

  sumFindOrderProductHistory$ = createEffect(() => this.actions$.pipe(
    ofType(sumFindOrderProductHistory),
    mergeMap(({ params }) => this.benefitSatementService.sumFindOrderProductHistory(params).pipe(
      map(res => sumFindOrderProductHistorySuccess({ benefit: res })),
      catchError(msg => of(sumFindOrderProductHistoryFailure({ msg: msg })))
    ))
  ));

  // member-info
  getMemberInfo$ = createEffect(() => this.actions$.pipe(
    ofType(getMemberInfo),
    mergeMap(({ params }) => this.benefitSatementService.getMemberInfo(params).pipe(
      map(res => getMemberInfoSuccess({ member: res })),
      catchError(msg => of(getMemberInfoFailure({ msg: msg })))
    ))
  ));

};
