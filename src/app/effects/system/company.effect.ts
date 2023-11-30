import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { map, mergeMap, catchError, debounceTime } from 'rxjs/operators';
import { CompanyService } from "../../services/system/company.service";
import { loadCompany, loadCompanySuccess, loadCompanyFailure } from "../../actions/system/company.actions";

@Injectable()
export class CompanyEffect {

  loadCompany$ = createEffect(() => this.actions$.pipe(
      ofType(loadCompany),
      debounceTime(300),
      mergeMap(() => this.companyService.getCompany()        
        .pipe(
          //skip(1),
          map(
            comp => (loadCompanySuccess({company: comp})
            )),
          catchError(
            msg => of(loadCompanyFailure ({msg: msg})
            ))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private companyService: CompanyService
  ) {}
}
