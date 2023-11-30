import { createReducer, on } from "@ngrx/store";

import { PageHeadingState } from "@app/selectors/page-heading.selector";
import { MyProgram } from "@app/models/system/my-program.model";
import { setPageHeading, setShowPageHeading, setTypePageHeading } from "@app/actions/page-heading.action";
import { Node } from "@app/models/components/node.model";
import { PageHeadingConstants } from "@app/common/constant/page-heading.constant";

export const pageHeadingFeatureKey = 'pageHeading';

export const initialState: PageHeadingState = {
  data: {} as MyProgram,
  child: {} as MyProgram,
  children: [] as Node<MyProgram>[],
  pathname: "",
  showPageHeading: false,
  type: PageHeadingConstants.typeHP,
}

export const pageHeadingReducer = createReducer(
  initialState,
  on(setPageHeading, (state, { node, child, pathname }) => ({
    data: node.data,
    child: child,
    children: node.children,
    pathname: pathname,
    showPageHeading: pathname === child.linkInfo,
    type: state.type
  })),
  on(setShowPageHeading, (state, { show }) => ({...state, showPageHeading: show})),
  on(setTypePageHeading, (state, { payload }) => ({...state, type: payload}))
);