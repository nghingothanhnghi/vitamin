import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, debounceTime, count } from 'rxjs/operators';
import { OmnitritionConsumerSalesRatioInquiryService } from "../../../services/myoffice/omnitrition/omnitrition-consumer-sales-ratio-inquiry.service";
import { countConsumserSalesRatioSuccess, searchConsumserSalesRatioSuccess, sumConsumserSalesRatioSuccess} from "../../../actions/myoffice/omnitrition/consumer-sales-ratio-inquiry/OmnitritionConsumerSalesRatioInquiry.action";
import { countConsumserSalesRatioFailure, searchConsumserSalesRatioFailure, sumConsumserSalesRatioFailure} from "../../../actions/myoffice/omnitrition/consumer-sales-ratio-inquiry/OmnitritionConsumerSalesRatioInquiry.action";
import { countConsumserSalesRatio, searchConsumserSalesRatio, sumConsumserSalesRatio} from "../../../actions/myoffice/omnitrition/consumer-sales-ratio-inquiry/OmnitritionConsumerSalesRatioInquiry.action";



@Injectable()
export class ConsSalesRatioInquiryEffect {
  constructor(
    private actions$: Actions,
    private  omniConsSalesRatioService : OmnitritionConsumerSalesRatioInquiryService
  ) { }

  searchConsSalesRatioInquiry$= createEffect(()=>this.actions$.pipe(
    ofType(searchConsumserSalesRatio),
    mergeMap((action) => this.omniConsSalesRatioService.search(action.parmas).pipe(
      map(
        cons => (searchConsumserSalesRatioSuccess({ consumerSalesRatios:cons })
        )),
      catchError(
        msg => of(searchConsumserSalesRatioFailure({ msg: msg })
        ))
    ))  

  ));

  countConsSalesRatioInquiry$=createEffect(()=>this.actions$.pipe(
    ofType(countConsumserSalesRatio),
    mergeMap((action) => this.omniConsSalesRatioService.getCount(action.parmas).pipe(
      map(
        countCons => (countConsumserSalesRatioSuccess({ count:countCons })
        )),
      catchError(
        msg => of(countConsumserSalesRatioFailure({ msg: msg })
        ))
    ))  

    ));
    sumConsSalesRatioInquiry$=createEffect(()=>this.actions$.pipe(
      ofType(sumConsumserSalesRatio),
      mergeMap((action) => this.omniConsSalesRatioService.getSum(action.parmas).pipe(
        map(
          sumCons => (sumConsumserSalesRatioSuccess({ consumerSalesRatio:sumCons })
          )),
        catchError(
          msg => of(sumConsumserSalesRatioFailure({ msg: msg })
          ))
      ))  
  
      ));

}
