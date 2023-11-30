import { Component, OnInit } from '@angular/core';
import { AuthUtil } from '@app/common/util/auth.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { getSmWownet, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

declare const handleDecorElements: any;
declare const onClickToTarget: any;
@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
    smWownet$ = new Observable<SmWownetModel>;

    urlWownet: string = "";
    lMemRegYn: String = "";
    isLogined: boolean = AuthUtil.isLogined();

    lshowPdtYn: string = "";
    
    constructor(
        private _smWownetStateStore: Store<SmWownetState>
    ) {
        this.smWownet$ = this._smWownetStateStore.select(getSmWownet);
    }

    ngOnInit(): void {
        this.smWownet$.subscribe(res => {
            if (ValidationUtil.isNotNullAndNotEmpty(res)) {
                this.lMemRegYn = res.lMemRegYn;
                this.urlWownet = res.urlWownet;
                this.lshowPdtYn = res.lshowPdtYn;
            }
        });

        handleDecorElements();
    }
    scrollElement(e1: string) {
        onClickToTarget(e1);
      }
}
