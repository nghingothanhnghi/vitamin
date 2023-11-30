import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CompanyState, getCompany } from '@app/selectors/system/company.selector';
import { Company } from '@app/models/system/company.model';
import { loadCompany } from '@app/actions/system/company.actions';
import { getMemInfo, MemberInfoInquiryState } from '@app/selectors/myoffice/member/member-infor-inquiry.selector';
import { MemInfo } from '@app/models/myoffice/member/mem-info.model';
import { loadMemInfo } from '@app/actions/myoffice/member/member-infor-inquiry.actions';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { DateUtils } from '@app/common/util/date.util';

@Component({
  selector: 'app-member-inquiry-report',
  templateUrl: './member-inquiry-report.component.html',
  styleUrls: ['./member-inquiry-report.component.css']
})
export class MemberInquiryReportComponent implements OnInit {


  userid: string = "";
  regisDate: string = "";

  company$ = new Observable<Company>;
  company: Company = {} as Company;

  memInfo$ = new Observable<MemInfo>;
  memInfo: MemInfo = {} as MemInfo;

  constructor(
    private _memberInfoStore: Store<MemberInfoInquiryState>,
    private _companyStore: Store<CompanyState>,
    private _activatedRoute: ActivatedRoute,
    ) {
      this.company$ = this._companyStore.select(getCompany);
      this.memInfo$ = this._memberInfoStore.select(getMemInfo);
     }

  ngOnInit(): void {
    this.regisDate = DateUtils.getCurrentDate(true)
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.userid = ConvertUtil.convertToSring(params.get("userId"));
      this._companyStore.dispatch(loadCompany());
      this._memberInfoStore.dispatch(loadMemInfo(this.userid));
    });

    this.company$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.company = res;
        this.print();
      }
    });

    this.memInfo$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.memInfo = res;
        this.print();
      }
    });
  }

  print(): void {
    if (ValidationUtil.isNullOrEmpty(this.company.comId)) return;
    if (ValidationUtil.isNullOrEmpty(this.memInfo.userid)) return;
    setTimeout(() => window.print(), 500);
  }
}
