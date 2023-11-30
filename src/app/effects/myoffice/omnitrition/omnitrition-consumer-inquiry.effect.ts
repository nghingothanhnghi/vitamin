import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, debounceTime } from 'rxjs/operators';
import { OmnitritionConsumerInquiryService } from "../../../services/myoffice/omnitrition/omnitrition-consumer-inquiry.service";
import { countConsumser, countConsumserFailure, countConsumserSuccess,searchConsumser,searchConsumserFailure,searchConsumserSuccess } from "../../../actions/myoffice/omnitrition/consumer-inquiry/omnitrition-consumer-inquiry.action";



@Injectable()
export class OmnitritionConsumerInquiryEffect {

  constructor(
    private  actions$: Actions,
    private  omConsumerInquiryService : OmnitritionConsumerInquiryService
  ) { }

  searchConsumerInquiry$= createEffect(()=>this.actions$.pipe(
    ofType(searchConsumser),
    mergeMap(({params}) => this.omConsumerInquiryService.search(params).pipe(
      map(
        cons => (searchConsumserSuccess({ consumerRegistrations:cons })
        )),
      catchError(
        msg => of(searchConsumserFailure({ msg: msg })
        ))
    ))  

  ));

  countConsumerInquiry$=createEffect(()=>this.actions$.pipe(
    ofType(countConsumser),
    mergeMap(({params}) => this.omConsumerInquiryService.getCount(params).pipe(
      map(
        countCons => (countConsumserSuccess({ count:countCons })
        )),
      catchError(
        msg => of(searchConsumserFailure({ msg: msg })
        ))
    ))  

    ));


    



}
