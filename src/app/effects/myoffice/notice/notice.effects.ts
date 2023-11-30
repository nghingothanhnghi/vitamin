import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, debounceTime } from 'rxjs/operators';
import { of } from 'rxjs';

import { NoticeService } from '@app/services/myoffice/notice/notice.service';
import { countBoardList, countBoardListFailure, countBoardListSuccess, countNotice, countNoticeFailure, countNoticeSuccess, detailNotice, detailNoticeFailure, detailNoticeSuccess, listFile, listFileFailure, listFileSuccess, searchBoardFindLasted, searchBoardFindLastedFailure, searchBoardFindLastedSuccess, searchBoardList, searchBoardListFailure, searchBoardListSuccess, searchNotice, searchNoticeFailure, searchNoticeSuccess, searchNoticeY, searchNoticeYFailure, searchNoticeYSuccess } from '@app/actions/myoffice/notice/notice.action';

@Injectable()
export class NoticeEffect {

  constructor(
    private actions$: Actions,
    private noticeService: NoticeService
  ) { }

  searchNotice$ = createEffect(() => this.actions$.pipe(
    ofType(searchNotice),
    mergeMap(({ params }) => this.noticeService.search(params).pipe(
      map(res => searchNoticeSuccess({ notice: res })),
      catchError(msg => of(searchNoticeFailure({ msg: msg })))
    ))
  ));
  
  countNotice$ = createEffect(() => this.actions$.pipe(
    ofType(countNotice),
    mergeMap(({ params }) => this.noticeService.getCount(params).pipe(
      map(res => countNoticeSuccess({ total: res })),
      catchError(msg => of(countNoticeFailure({ msg: msg })))
    ))
  ));

  detailNotice$ = createEffect(() => this.actions$.pipe(
    ofType(detailNotice),
    mergeMap(({ boardNo }) => this.noticeService.getDetail(boardNo).pipe(
      map(res => detailNoticeSuccess({ detail: res })),
      catchError(msg => of(detailNoticeFailure({ msg: msg })))
    ))
  ));

  listFile$ = createEffect(() => this.actions$.pipe(
    ofType(listFile),
    mergeMap(({ boardNo }) => this.noticeService.getListFile(boardNo).pipe(
      map(res => listFileSuccess({ file : res })),
      catchError(msg => of(listFileFailure({ msg: msg })))
    ))
  ));

  searchNoticeY$ = createEffect(() => this.actions$.pipe(
  ofType(searchNoticeY),
    mergeMap(({params}) => this.noticeService.search(params).pipe(
      map((res) => searchNoticeYSuccess({ noticeY: res })),
      catchError((msg) => of(searchNoticeYFailure({ msg: msg })))
    ))
  ));

  searchBoardFindLasted$ = createEffect(() => this.actions$.pipe(
    ofType(searchBoardFindLasted),
    mergeMap(({ params }) => this.noticeService.searchBoardFindLasted(params).pipe(
      map(res => searchBoardFindLastedSuccess({ notice: res })),
      catchError(msg => of(searchBoardFindLastedFailure({ msg: msg })))
    ))
  ));

  searchBoardList$ = createEffect(() => this.actions$.pipe(
    ofType(searchBoardList),
    mergeMap(({ params }) => this.noticeService.searchBoardList(params).pipe(
      map(res => searchBoardListSuccess({ boardList: res })),
      catchError(msg => of(searchBoardListFailure({ msg: msg })))
    ))
  ));
  
  countBoardList$ = createEffect(() => this.actions$.pipe(
    ofType(countBoardList),
    mergeMap(({ params }) => this.noticeService.countBoardList(params).pipe(
      map(res => countBoardListSuccess({ total: res })),
      catchError(msg => of(countBoardListFailure({ msg: msg })))
    ))
  ));

};
