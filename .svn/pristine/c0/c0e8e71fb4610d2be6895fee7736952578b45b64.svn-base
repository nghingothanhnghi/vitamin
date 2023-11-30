import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Company } from '@app/models/system/company.model';
import { CompanyState, getCompany } from '@app/selectors/system/company.selector'
import { loadCompany } from '@app/actions/system/company.actions';
import { ValidationUtil } from '@app/common/util/validation.util';

declare const addReWriteSpan: any;

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./../../../../assets/css/home/aplgo/about-us.css',
              './about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  

  company$ = new Observable<Company>; 
  company = {} as Company;

  constructor(
    private _companyStore: Store<CompanyState>,
  ) { 
    this.company$ = this._companyStore.select(getCompany);
  }

  ngOnInit(): void {
    this._companyStore.dispatch(loadCompany());
    this.company$.subscribe(res => {
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.company = res;
      // }else{
      //   this.company = {} as Company;
      }

      setTimeout(() => {
        addReWriteSpan();
      }, 200);
    })
  }

}
