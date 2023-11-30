import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, debounceTime } from 'rxjs/operators';
import { ConsumerSalesRegistrationService } from "../../../services/myoffice/omnitrition/consumer-sales-registration.service";
import { countPdt, countPdtFailure, countPdtSuccess, countSale, countSaleFailure, countSaleSuccess, loadConsumerSales, loadConsumerSalesFailure, loadConsumerSalesSuccess
,loadInfoConsumer, loadInfoConsumerFailure,loadInfoConsumerSuccess, loadListConsumer, loadListConsumerFailure, loadListConsumerSuccess, loadListPdt, loadListPdtFailure, loadListPdtSuccess
,loadListSale, loadListSaleFailure, loadListSaleSuccess, save, saveFailure, saveSuccess } from "@actions/myoffice/omnitrition/consumer-sales-registration/consumer-sales-registration.action";



@Injectable()
export class ConsumerSalesRegisEffect {

  constructor(
    private actions$: Actions,
    private  consSalesRegisService : ConsumerSalesRegistrationService
  ) { }

  loadListConsumer$= createEffect(()=>this.actions$.pipe(
    ofType(loadListConsumer),
    mergeMap(({params}) => this.consSalesRegisService.getlistConsumer(params).pipe(
      map(
        cons => (loadListConsumerSuccess({ listConsumer:cons })
        )),
      catchError(
        msg => of(loadListConsumerFailure({ msg: msg })
        ))
    ))  

  ));

  getInfoConsumer$=createEffect(()=>this.actions$.pipe(
    ofType(loadInfoConsumer),
    mergeMap((action) => this.consSalesRegisService.getInfoConsumer(action.csmId).pipe(
      map(
        inforCons => (loadInfoConsumerSuccess({ infoConsumer:inforCons })
        )),
      catchError(
        msg => of(loadInfoConsumerFailure({ msg: msg })
        ))
    ))  

    ));
    getConsumerSales$=createEffect(()=>this.actions$.pipe(
      ofType(loadConsumerSales),
      mergeMap((action) => this.consSalesRegisService.getConsumerSales(action.userId).pipe(
        map(
          consumer => (loadConsumerSalesSuccess({ consumerSale:consumer })
          )),
        catchError(
          msg => of(loadConsumerSalesFailure({ msg: msg })
          ))
      ))  
  
      ));

      getListPdt$= createEffect(()=>this.actions$.pipe(
        ofType(loadListPdt),
        mergeMap((action) => this.consSalesRegisService.getListPdt(action.userId).pipe(
          map(
            listPro=> (loadListPdtSuccess({ listPdt:listPro })
            )),
          catchError(
            msg => of(loadListPdtFailure({ msg: msg })
            ))
        ))  
    
      ));
    
      getCountPdt$=createEffect(()=>this.actions$.pipe(
        ofType(countPdt),
        mergeMap((action) => this.consSalesRegisService.getCountPdt(action.userId).pipe(
          map(
            countCons => (countPdtSuccess({ countPdt:countCons })
            )),
          catchError(
            msg => of(countPdtFailure({ msg: msg })
            ))
        ))  
    
        ));
        getListSale$=createEffect(()=>this.actions$.pipe(
          ofType(loadListSale),
          mergeMap((action) => this.consSalesRegisService.getListSale(action.userId).pipe(
            map(
              res => (loadListSaleSuccess({ listSales:res })
              )),
            catchError(
              msg => of(loadListSaleFailure({ msg: msg })
              ))
          ))  
      
          ));
          getCntSale$= createEffect(()=>this.actions$.pipe(
            ofType(countSale),
            mergeMap((action) => this.consSalesRegisService.getCntSale(action.userId).pipe(
              map(
                count => (countSaleSuccess({ countSales:count })
                )),
              catchError(
                msg => of(countSaleFailure({ msg: msg })
                ))
            ))  
        
          ));
        
          save$=createEffect(()=>this.actions$.pipe(
            ofType(save),
            mergeMap(({params}) => this.consSalesRegisService.save(params).pipe(
              map(
                res => (saveSuccess({ resultSave:res })
                )),
              catchError(
                msg => of(saveFailure({ msg: msg })
                ))
            ))  
        
            ));
          
}
