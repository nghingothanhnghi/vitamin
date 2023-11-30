import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { PersonalInforService } from '@app/services/myoffice/user-profile/personal-information.service';
import { searchPersonalInfo, searchPersonalInfoFailure, searchPersonalInfoSuccess } from '@app/actions/myoffice/user-profile/personal-information.action';

@Injectable()
export class PersonalInfoEffect {

  constructor(
    private actions$: Actions,
    private PersonalInforService: PersonalInforService
  ) { }

  searchPersonalInfo$ = createEffect(() => this.actions$.pipe(
    ofType(searchPersonalInfo),
    mergeMap(({ userid}) => this.PersonalInforService.search(userid).pipe(
      map(res => searchPersonalInfoSuccess({ personalInfo: res })),
      catchError(msg => of(searchPersonalInfoFailure({ msg: msg })))
    ))
  ));

};
