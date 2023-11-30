import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyProgramConstant } from '@app/common/constant/my-program.constant';
import { CommonUtils } from '@app/common/util/common.util';
import { MyProgram } from '@app/models/system/my-program.model';
import {
  getMyPrograms,
  MyProgramState,
} from '@app/selectors/system/my-program.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCompany } from '../../actions/system/company.actions';
import { Company } from '../../models/system/company.model';
import {
  CompanyState,
  getCompany,
} from '../../selectors/system/company.selector';

declare const backToTop: any;

@Component({
  selector: 'hp-footer',
  host: { class: 'row bg-darker-light' },
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  company$ = new Observable<Company>();

  footerMenu: MyProgram[] = [];
  sidebarMenu: MyProgram[] = [];

  constructor(
    private _companyStore: Store<CompanyState>,
    private _myProgramStore: Store<MyProgramState>,
    private _router: Router
  ) {
    this.company$ = this._companyStore.select(getCompany);
  }

  ngOnInit(): void {
    this._companyStore.dispatch(loadCompany());

    this._myProgramStore.select(getMyPrograms).subscribe((res) => {
      this.footerMenu = res.filter(
        (y) => y.prgKind == MyProgramConstant.kindMenuFooter
      );
      this.sidebarMenu = res.filter(
        (y) => y.prgKind == MyProgramConstant.kindSidebar
      );
    });
  }

  handleOnClickBackToTop(): void {
    if (typeof backToTop === 'function') {
      backToTop();
    }
  }
}
