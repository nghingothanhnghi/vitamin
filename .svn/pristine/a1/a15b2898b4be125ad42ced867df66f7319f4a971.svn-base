import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, debounceTime } from 'rxjs/operators';
import { UnsoldProductInquiryService } from "../../../services/myoffice/omnitrition/unsold-product-inquiry.service";
import { countConsumserSalesRegisSuccess, sumConsumserSalesRegisSuccess, searchConsumserSalesRegisSuccess, searchConsumserSalesRegisFailure, countConsumserSalesRegisFailure, sumConsumserSalesRegisFailure } from "../../../actions/myoffice/omnitrition/unsold-product-inquiry/unsold-product-inquiry.action";
import { countConsumserSalesRegis, sumConsumserSalesRegis, searhConsumserSalesRegis } from "../../../actions/myoffice/omnitrition/unsold-product-inquiry/unsold-product-inquiry.action";



@Injectable()
export class UnsoldProductInquiryEffect {

  constructor(
    private actions$: Actions,
    private  unProInquiryService : UnsoldProductInquiryService
  ) { }

  searchUnsoldProInquiry$= createEffect(()=>this.actions$.pipe(
    ofType(searhConsumserSalesRegis),
    mergeMap(({params}) => this.unProInquiryService.search(params).pipe(
      map(
        cons => (searchConsumserSalesRegisSuccess({ consSalesResgiss:cons })
        )),
      catchError(
        msg => of(searchConsumserSalesRegisFailure({ msg: msg })
        ))
    ))  

  ));

  countUnsoldProInquiry$=createEffect(()=>this.actions$.pipe(
    ofType(countConsumserSalesRegis),
    mergeMap(({params}) => this.unProInquiryService.getCount(params).pipe(
      map(
        countCons => (countConsumserSalesRegisSuccess({ count:countCons })
        )),
      catchError(
        msg => of(countConsumserSalesRegisFailure({ msg: msg })
        ))
    ))  

    ));
    sumUnsoldProInquiry$=createEffect(()=>this.actions$.pipe(
      ofType(sumConsumserSalesRegis),
      mergeMap(({params}) => this.unProInquiryService.getSum(params).pipe(
        map(
          sumCons => (sumConsumserSalesRegisSuccess({ consSalesResgis:sumCons })
          )),
        catchError(
          msg => of(sumConsumserSalesRegisFailure({ msg: msg })
          ))
      ))  
  
      ));

}
