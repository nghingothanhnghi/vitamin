import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, debounceTime } from 'rxjs/operators';
import { OmnitritionConsumerRegistrationService } from "../../../services/myoffice/omnitrition/omnitrition-consumer-registration.service";
import { countConsumserRegistrationSuccess, deleteConsumserRegistrationSuccess, saveConsumserRegistrationSuccess,searchConsumserRegistrationSuccess } from "../../../actions/myoffice/omnitrition/consumer-registration/omnitrition-consumer-registration.action";
import { countConsumserRegistrationFailure, deleteConsumserRegistrationFailure, saveConsumserRegistrationFailure,searchConsumserRegistrationFailure } from "../../../actions/myoffice/omnitrition/consumer-registration/omnitrition-consumer-registration.action";
import { countConsumserRegistration, deleteConsumserRegistration, saveConsumserRegistration,searchConsumserRegistration } from "../../../actions/myoffice/omnitrition/consumer-registration/omnitrition-consumer-registration.action";



@Injectable()
export class OmnitritionConsumerRegisEffect {

  constructor(
    private actions$: Actions,
    private  omConsumerRegisService : OmnitritionConsumerRegistrationService
  ) { }

  searchConsumerRegis$= createEffect(()=>this.actions$.pipe(
    ofType(searchConsumserRegistration),
    mergeMap(({ params }) => this.omConsumerRegisService.getlistConsumer(params).pipe(
      map(
        cons => (searchConsumserRegistrationSuccess({ consumerRegistrations:cons })
        )),
      catchError(
        msg => of(searchConsumserRegistrationFailure({ msg: msg })
        ))
    ))  

  ));

  getCountConsumer$=createEffect(()=>this.actions$.pipe(
    ofType(countConsumserRegistration),
    mergeMap(({ params }) => this.omConsumerRegisService.getCountConsumer(params).pipe(
      map(
        countCons => (countConsumserRegistrationSuccess({ count:countCons })
        )),
      catchError(
        msg => of(countConsumserRegistrationFailure({ msg: msg })
        ))
    ))  

    ));
    save$= createEffect(()=>this.actions$.pipe(
        ofType(saveConsumserRegistration),
        mergeMap(({ params }) => this.omConsumerRegisService.save(params).pipe(
          map(
            res => (saveConsumserRegistrationSuccess({ result:res })
            )),
          catchError(
            msg => of(saveConsumserRegistrationFailure({ msg: msg })
            ))
        ))  
    
      ));
    
      delete$=createEffect(()=>this.actions$.pipe(
        ofType(deleteConsumserRegistration),
        mergeMap(({ params }) => this.omConsumerRegisService.delete(params).pipe(
          map(
            res => (deleteConsumserRegistrationSuccess({ result:res })
            )),
          catchError(
            msg => of(deleteConsumserRegistrationFailure({ msg: msg })
            ))
        ))  
    
        ));
    

    



}
