import { Component, Input, OnInit } from '@angular/core';
import { searchBoardList } from '@app/actions/myoffice/notice/notice.action';
import { ValidationUtil } from '@app/common/util/validation.util';
import { NoticeModel } from '@app/models/myoffice/notice/notice.model';
import { NoticeSearchState, searchBoardListItems } from '@app/selectors/myoffice/notice/notice.selector';
import { environment } from '@enviroments/environment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

declare const addEventListenerYoutubePlay: any;

@Component({
  selector: 'hp-media',
  templateUrl: './hp-media.component.html',
  styleUrls: ['./hp-media.component.css']
})
export class HpMediaComponent implements OnInit {

  @Input() urlWownet : String = "";
  
  boardListItems$ = new Observable<NoticeModel[]>;
  collection: any[] = [];

  constructor(
    private _noticeSearchStore: Store<NoticeSearchState>,
  ) {
    this.boardListItems$ = this._noticeSearchStore.select(searchBoardListItems);
   }

  ngOnInit(): void {
    this.onSearch();
  }

  onSearch(): void {
    let params = this.getParams();

    this._noticeSearchStore.dispatch(searchBoardList({ params: params }));

    //Render Body
     this.boardListItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        let item = [];
        for(let i = 0; i<res.length;i++) {
          let pathImg = "./assets/img/noImage.jpg";
          if(ValidationUtil.isNotNullAndNotEmpty(res[i].filePath) && ValidationUtil.isNotNullAndNotEmpty(res[i].fileName)) {
             pathImg = this.urlWownet + "/" + res[i].filePath + "/" + res[i].fileName;
          }
          item.push({... res[i], "pathImg" : pathImg});
        }
        this.collection = item;
        setTimeout(() => {
          addEventListenerYoutubePlay("#st-video .ytp-play-button");
        }, 1000);
      } else {
        this.collection = [];
      }
    });
  }

  getParams(): any {
    let params = {
      comId: environment.comId,
      comCd: environment.comCd,
      kindCd : environment.comCd + "B11",
      len : 5,
      page : 0
    }
    return params;
  }
}
