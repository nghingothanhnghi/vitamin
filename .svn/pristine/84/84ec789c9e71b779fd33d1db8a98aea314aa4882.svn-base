import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Company } from '@app/models/system/company.model';
import { CompanyState, getCompany } from '@app/selectors/system/company.selector'
import { loadCompany } from '@app/actions/system/company.actions';
import { ValidationUtil } from '@app/common/util/validation.util';

declare const daum: any;

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./../../../../assets/css/home/aplgo/contact.css','./store.component.css']
})
export class StoreComponent implements OnInit {

  company$ = new Observable<Company>; 
  company = {} as Company;

  constructor(
    private _companyStore: Store<CompanyState>,
  ) { 
    this.company$ = this._companyStore.select(getCompany);
  }

  ngOnInit(): void {
    new daum.roughmap.Lander({
      "timestamp": "1664439306374",
      "key": "2bvop",
      "mapHeight": "360"
    }).render();

    new daum.roughmap.Lander({
      "timestamp": "1675405745190",
      "key": "2dmu5",
      "mapHeight": "360"
    }).render();

    new daum.roughmap.Lander({
      "timestamp": "1676363252296",
      "key": "2dqph",
      "mapHeight": "360"
    }).render();

    this._companyStore.dispatch(loadCompany());
    this.company$.subscribe(res => {
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.company = res;
      }
    })
  }
}
