import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { map, mergeMap, catchError, debounceTime } from 'rxjs/operators';
import { BankService } from "../../services/system/bank.service";
import { loadBank, loadBankSuccess, loadBankFailure } from "../../actions/system/bank.actions";

@Injectable()
export class BankEffect {

  loadBank$ = createEffect(() => this.actions$.pipe(
      ofType(loadBank),
      debounceTime(300),
      mergeMap((action) => this.bankService.getBank(action.kind)        
        .pipe(
          map(
            res => (loadBankSuccess({banks: res})
            )),
          catchError(
            msg => of(loadBankFailure ({msg: msg})
            ))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private bankService: BankService
  ) {}
}
