import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { CountryService } from 'src/app/services/system/country.service';
import * as countryAction from "src/app/actions/system/country.action";

@Injectable()
export class CountryEffects {

  constructor(
    private _actions$: Actions,
    private countryService: CountryService
  ) { }

  loadCountrys$ = createEffect(() => this._actions$.pipe(
    ofType(countryAction.loadCountrys),
    switchMap(() => this.countryService.searchCountry().pipe(
      map((res) => countryAction.loadCountrysSuccess({ countrys: res })),
      catchError((err) => of(countryAction.loadCountrysFailure({ msg: err })))
    ))
  ));
}