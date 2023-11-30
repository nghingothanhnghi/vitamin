import { Component, OnInit } from '@angular/core';
import { PopBoardModel } from '@models/homepage/pop-board.model';
import { getPopBoards, PopBoardState } from '@app/selectors/homepage/pop-board.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadPopBoards } from '@app/actions/homepage/pop-board.action';
import { ValidationUtil } from '@app/common/util/validation.util';
import { getSmWownet, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { loadSmWownet } from '@app/actions/system/sm-wownet.action';
import { CookieService } from 'ngx-cookie-service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';


declare const hiddenAllBoardNoPopup: any;

@Component({
  selector: 'board-popup',
  templateUrl: './board-popup.component.html',
  styleUrls: ['./board-popup.component.css'],
})
export class BoardPopupComponent implements OnInit {

  deviceType:string = ''
  items:PopBoardModel[] = []
  tempItem : PopBoardModel = {} as PopBoardModel
  popBoards$ = new Observable<PopBoardModel[]>;
  smWownet$ = new Observable<SmWownetModel>;
  
  urlWownet :string = ''
  strRplImg1 :string =  'uploads/'
  strRplImg2 :string = ''
  strRplText1 :string = 'src="'
  strRplText2 :string = ''

  loadDone: boolean = false;

  constructor(
    private _popBoardStore: Store<PopBoardState>,
    private _smWownetStore: Store<SmWownetState>,
    private _cookieService: CookieService,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private deviceService: DeviceDetectorService) { 
    this.popBoards$ = this._popBoardStore.select(getPopBoards);
    this.smWownet$ = this._smWownetStore.select(getSmWownet);
  }

  ngOnInit(): void {
    this.deviceType = this.deviceService.isDesktop()? 'PC':'MOBILE'

    this._popBoardStore.dispatch(loadPopBoards());
    this._smWownetStore.dispatch(loadSmWownet());
    this.smWownet$.subscribe(res => {
      if (res && res.urlWownet) {
        this.strRplText2 = 'src="' + res.urlWownet
        this.strRplImg2 = res.urlWownet + '/uploads/'
      }
    })
    this.popBoards$.subscribe(res=>{
      this.items =res.filter(item=>{
        return !this.isCloseWCookie(item.boardNo)
      })

      if (res.length > 0) {
        let count = 0;
        for (const item of res) {
          if (this.isCloseWCookie(item.boardNo)) {
            count = 0;
            break;
          }
          count++;
        }
        const tm = setInterval(() => {
          if (count !== 0) {
            this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
          }
        }, 100);

        setTimeout(() => {
          const _div = document.getElementById('pop-boards') as HTMLDivElement;
          if (_div) {
            _div.style.zIndex = '999999999';
            _div.style.opacity = '1';
            this.loadDone = true;
          }
          clearInterval(tm);
          if (count !== 0) {
            this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
          }
        }, 4000);
      }
    })
  }

  openLink(url:string){
    if(ValidationUtil.isNotNullAndNotEmpty(url)){
      window.open(url, "_blank");
    }
  }

  closePopUp(boardNo:string, $event: any){
    $event.stopPropagation();
    if (ValidationUtil.isNotNullAndNotEmpty(boardNo)) {
      const input = document.getElementById(`pop-board-${boardNo}`) as HTMLDivElement;
      if (input) {
        input.hidden = true
      }
    }
  }
  
  // closeAllThisDay(boardNo:string,$event: any){
  //   // $event.stopPropagation();
  //   // const expiredDate = new Date()
  //   // expiredDate.setDate(expiredDate.getDate() + 1 );
  //   // this._cookieService.set(`pop-board-${boardNo}`, 'true', expiredDate);
  // }
  isCloseWCookie(boardNo: string):boolean {
    var val = this._cookieService.get(`pop-board-${boardNo}`);
    return val === 'true'
  }
  
  handleOnClickClosePopup(event:any): void {
    if(this.loadDone && event.target.className === "close-board") {
      let elementQ = document.getElementsByClassName('temporarily-hidden'); 
      hiddenAllBoardNoPopup(elementQ);
    } 
  }

}
