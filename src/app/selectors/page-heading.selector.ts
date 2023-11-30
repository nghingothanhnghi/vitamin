import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MyProgram } from '@app/models/system/my-program.model';
import { pageHeadingFeatureKey } from '@app/reducers/page-heading.reducer';
import { Node } from '@app/models/components/node.model';

export interface PageHeadingState {
  data: MyProgram;
  child: MyProgram;
  children: Node<MyProgram>[];
  pathname: string;
  showPageHeading: boolean;
  type: string;
}

export const getPageHeadingState = createFeatureSelector<PageHeadingState>(pageHeadingFeatureKey);

export const getPageHeadingData = createSelector(
  getPageHeadingState,
  (state: PageHeadingState) => state.data
);

export const getPageHeadingChild = createSelector(
  getPageHeadingState,
  (state: PageHeadingState) => state.child
);

export const getPageHeadingChildren = createSelector(
  getPageHeadingState,
  (state: PageHeadingState) => state.children
);

export const getPathname = createSelector(
  getPageHeadingState,
  (state: PageHeadingState) => state.pathname
);

export const showPageHeading = createSelector(
  getPageHeadingState,
  (state: PageHeadingState) => state.showPageHeading
)

export const getTypePageHeading = createSelector(
  getPageHeadingState,
  (state: PageHeadingState) => state.type
);