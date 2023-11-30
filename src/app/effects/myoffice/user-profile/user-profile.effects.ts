import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserProfileService } from "@services/myoffice/user-profile/user-profile.service";
import { loadUserProfile, loadUserProfileFailure, loadUserProfileSuccess } from '@app/actions/myoffice/user-profile/user-profile.actions';

@Injectable()
export class UserProfileEffect {
    constructor(
        private actions$: Actions,
        private userProfileService: UserProfileService
      ) { } 
    
      getUserProfile$ = createEffect(() => this.actions$.pipe(
        ofType(loadUserProfile),
        mergeMap((action) => this.userProfileService.getUserProfile(action.userId).pipe(
          map(res => (loadUserProfileSuccess({ userprofile : res }))),
          catchError(msg => of(loadUserProfileFailure({ msg: msg })))
        ))
      ));
}

