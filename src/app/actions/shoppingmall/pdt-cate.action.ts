import { createAction, props } from '@ngrx/store';

import { PdtCateModel } from '@app/models/shoppingmall/pdt-cate.model';

export const loadPdtCate = createAction("[Product API] load pdt cate", props<{ key: string }>());

export const loadPdtCateSuccess = createAction("[Product API] load pdt cate success", props<{ items: PdtCateModel[] }>());

export const loadPdtCateFailure = createAction("[Product API] load pdt cate failure", props<{ msg: any }>());