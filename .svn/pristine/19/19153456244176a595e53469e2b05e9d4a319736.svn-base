import {createAction, props} from '@ngrx/store';

import { MyProgram } from 'src/app/models/system/my-program.model';

export const loadMyPrograms = createAction(
    '[MyProgram API] Load MyProgram'
);

export const loadMyProgramsSuccess = createAction(
    '[MyProgram API] Load MyProgram Success',
    props<{ myPrograms: MyProgram[] }>()
);

export const loadMyProgramsFailure = createAction(
    '[MyProgram API] Load MyProgram Failure',
    props<{ msg: any }>()
);