import { createAction, props } from '@ngrx/store';

import { Node } from '@app/models/components/node.model';
import { MyProgram } from '@app/models/system/my-program.model';

export const setPageHeading = createAction(
  "[page-heading] set page heading",
  props<{ node: Node<MyProgram>, child: MyProgram, pathname: string }>()
);

export const setShowPageHeading = createAction(
  "[page-heading] set show page heading",
  props<{ show: boolean }>()
);

export const setTypePageHeading = createAction(
  "[page-heading] set type page heading",
  props<{ payload: string }>()
);