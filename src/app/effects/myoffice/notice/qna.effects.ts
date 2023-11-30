import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { QnaService } from '@app/services/myoffice/notice/qna.service';
import { countQna, countQnaFailure, countQnaSuccess, deleteQna, deleteQnaFailure, deleteQnaSuccess, detailQna, detailQnaFailure, detailQnaSuccess, getBoardCateList, getBoardCateListFailure, getBoardCateListSuccess, saveQna, saveQnaFailure, saveQnaSuccess, searchQna, searchQnaFailure, searchQnaSuccess } from '@app/actions/myoffice/notice/qna.action';

@Injectable()
export class QnaEffect {

  constructor(
    private actions$: Actions,
    private qnaService: QnaService
  ) { }

  searchQna$ = createEffect(() => this.actions$.pipe(
    ofType(searchQna),
    mergeMap(({ params }) => this.qnaService.search(params).pipe(
      map(res => searchQnaSuccess({ qna: res })),
      catchError(msg => of(searchQnaFailure({ msg: msg })))
    ))
  ));

  countQna$ = createEffect(() => this.actions$.pipe(
    ofType(countQna),
    mergeMap(({ params }) => this.qnaService.getCount(params).pipe(
      map(res => countQnaSuccess({ total: res })),
      catchError(msg => of(countQnaFailure({ msg: msg })))
    ))
  ));

  saveQna$ = createEffect(() => this.actions$.pipe(
    ofType(saveQna),
    mergeMap(({ params }) => this.qnaService.save(params).pipe(
      map(res => saveQnaSuccess({ result: res })),
      catchError(msg => of(saveQnaFailure({ msg: msg })))
    ))
  ));

  detailQna$ = createEffect(() => this.actions$.pipe(
    ofType(detailQna),
    mergeMap(({ boardNo }) => this.qnaService.getDetail(boardNo).pipe(
      map(res => detailQnaSuccess({ detailQna: res })),
      catchError(msg => of(detailQnaFailure({ msg: msg })))
    ))
  ));
  
  getBoardCateList$ = createEffect(() => this.actions$.pipe(
    ofType(getBoardCateList),
    mergeMap(() => this.qnaService.getBoardCateList().pipe(
      map(res => getBoardCateListSuccess({ boardCateList: res })),
      catchError(msg => of(getBoardCateListFailure({ msg: msg })))
    ))
  ));

  deleteQna$ = createEffect(() => this.actions$.pipe(
    ofType(deleteQna),
    mergeMap(({ params }) => this.qnaService.deleteQna(params).pipe(
      map(res => deleteQnaSuccess({ result: res })),
      catchError(msg => of(deleteQnaFailure({ msg: msg })))
    ))
  ));

};
