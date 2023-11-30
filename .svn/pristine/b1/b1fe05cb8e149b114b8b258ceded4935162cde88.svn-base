import { Component, OnInit } from '@angular/core';
import { MemberConstants } from '@app/common/constant/member.constant';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { Router } from '@angular/router';
import { WAlertState } from '@app/selectors/w-alert.selector';
import { Store } from '@ngrx/store';
import { setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { MessageConstant } from '@app/common/constant/message.constant';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';
import { Observable } from 'rxjs';
import { getSmWownetPg, SmWownetState } from '@app/selectors/system/sm-wownet.selector';

@Component({
	selector: 'app-member-registration-step1',
	templateUrl: './member-registration-step1.component.html',
	styleUrls: ['./member-registration-step1.component.css']
})
export class MemberRegistrationStep1Component implements OnInit {

	userKindSS: string | null = ''
	userId: string = ''

	REGISTER_TERM_E_COMMERCE = 'e-commerce';
	REGISTER_TERM_PRIVACYPOLICY = 'privacyPolicy';
	REGISTER_TERM_CONSUMERMEMBERSHIP = 'consumerMembership';
	REGISTER_TERM_MULTI_LEVEL_SALESPERSON = 'Multi-Level Salesperson';
	REGISTER_TERM_AGREESUBMIT = 'agreeSubmit';
	REGISTER_TERM_AGREEALL = 'agreeAll';


	eCommercelTermChecked: boolean = false
	privacyPolicyChecked: boolean = false
	consumerMembershipTermChecked: boolean = false
	unMembershipTermChecked: boolean = false
	agreeSubmitFormChecked: boolean = false
	agreeAllChecked: boolean = false

	shopingMallTermOpened: boolean = true
	privacyPolicyOpened: boolean = false
	consumerMembershipTermOpened: boolean = false
	multLvSalesTermOpened: boolean = false
	agreeSubmitOpened: boolean = false

	radioValueAdult:number = -1
	radioValueNotify:number = -1
	radioValueDelivery:number = -1
	radioValueBenefits:number = -1
	radioValueChange:number = -1

	smWownetPg$ = new Observable<SmWownetPgModel>();
  	smWownetPg: any = {} as SmWownetPgModel;

	constructor(private _router: Router,
		private _wAlertStore: Store<WAlertState>,
		private _smWownetStateStore: Store<SmWownetState>,
	) {
		this.smWownetPg$ = this._smWownetStateStore.select(getSmWownetPg);
	 }

	ngOnInit(): void {
		this.userKindSS = sessionStorage.getItem(MemberConstants.STR_IS_CHECK_REGISTER);
		let data = window.sessionStorage.getItem(MemberConstants.STR_IS_DONE_STEP_CHOOSE_REGISTER);
		if (!(data == "true")) {
			this._router.navigate([MemberConstants.URL_CHOOSE_REGISTER]);
		}
		let member = AuthUtil.getLoginedInfo();
		if (member) {
			this.userId = ConvertUtil.convertToSring(member.userid);
		}
		this.smWownetPg$.subscribe(res => this.smWownetPg = res);
	}
	onClickCheckBox(ckeckName: string) {
		switch (ckeckName) {
			case this.REGISTER_TERM_E_COMMERCE:
				this.eCommercelTermChecked = !this.eCommercelTermChecked
				if (!this.eCommercelTermChecked) {
					this.agreeAllChecked = false
				}
				break;
			case this.REGISTER_TERM_PRIVACYPOLICY:
				this.privacyPolicyChecked = !this.privacyPolicyChecked
				if (!this.privacyPolicyChecked) {
					this.agreeAllChecked = false
				}
				break;
			case this.REGISTER_TERM_CONSUMERMEMBERSHIP:
				this.consumerMembershipTermChecked = !this.consumerMembershipTermChecked
				if (!this.consumerMembershipTermChecked) {
					this.agreeAllChecked = false
				}
				break;
			case this.REGISTER_TERM_MULTI_LEVEL_SALESPERSON:
				this.unMembershipTermChecked = !this.unMembershipTermChecked
				if (!this.unMembershipTermChecked) {
					this.agreeAllChecked = false
				}
				break;
			case this.REGISTER_TERM_AGREESUBMIT:
				this.agreeSubmitFormChecked = !this.agreeSubmitFormChecked
				if (!this.agreeSubmitFormChecked) {
					this.agreeAllChecked = false
				}
				break;
			case this.REGISTER_TERM_AGREEALL:
				this.agreeAllChecked = !this.agreeAllChecked 
				if (this.agreeAllChecked) {
					this.agreeSubmitFormChecked = true;
					this.unMembershipTermChecked = true;
					this.consumerMembershipTermChecked = true;
					this.privacyPolicyChecked = true;
					this.eCommercelTermChecked = true;
				} else {
					this.agreeSubmitFormChecked = false;
					this.unMembershipTermChecked = false;
					this.consumerMembershipTermChecked = false;
					this.privacyPolicyChecked = false;
					this.eCommercelTermChecked = false;
				}
				break;
			default:
				break;

		}
		if (this.agreeSubmitFormChecked == true
			&& this.unMembershipTermChecked == true
			&& this.consumerMembershipTermChecked == true
			&& this.privacyPolicyChecked == true
			&& this.eCommercelTermChecked == true
		) {
			this.agreeAllChecked = true
		}
	}
	onClickOpenButton(ckeckName: string) {
		switch (ckeckName) {
			case this.REGISTER_TERM_E_COMMERCE:
				this.shopingMallTermOpened = !this.shopingMallTermOpened
				break;
			case this.REGISTER_TERM_PRIVACYPOLICY:
				this.privacyPolicyOpened = !this.privacyPolicyOpened
				break;
			case this.REGISTER_TERM_CONSUMERMEMBERSHIP:
				this.consumerMembershipTermOpened = !this.consumerMembershipTermOpened
				break;
			case this.REGISTER_TERM_MULTI_LEVEL_SALESPERSON:
				this.multLvSalesTermOpened = !this.multLvSalesTermOpened
				break;
			case this.REGISTER_TERM_AGREESUBMIT:
				this.agreeSubmitOpened = !this.agreeSubmitOpened
				break;
			default:
				break;
		}
	}

	goPage() {
		if (!this.agreeAllChecked) {
			this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message:MessageConstant.msgAgreeTerm } }));
		}else if(this.radioValueChange !==1 
			|| this.radioValueBenefits !== 1
			|| this.radioValueNotify !== 1
			|| this.radioValueAdult !== 1){
				this.agreeSubmitOpened = true
			this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: MessageConstant.msgNoChecked } }));
		} else {
			if (this.userId && this.userId.length > 0) {
				window.sessionStorage.setItem(MemberConstants.STR_RID, this.userId);
			}

			if (this.userKindSS == MemberConstants.USER_KIND_MEMBER) {
				if(this.smWownetPg.ctBankYn != 'N'){
					window.sessionStorage.setItem(MemberConstants.STR_IS_DONE_STEP_1, 'true');
					this._router.navigate([MemberConstants.URL_STEP2]);
				}else{
					window.sessionStorage.setItem(MemberConstants.STR_IS_DONE_STEP_1, 'true');
					window.sessionStorage.setItem(MemberConstants.STR_IS_DONE_STEP_2, 'true');
					this._router.navigate([MemberConstants.URL_STEP3]);
				}
				
			} else {
				window.sessionStorage.setItem(MemberConstants.STR_IS_DONE_STEP_1, 'true');
				window.sessionStorage.setItem(MemberConstants.STR_IS_DONE_STEP_2, 'true');
				this._router.navigate([MemberConstants.URL_STEP3]);
			}
		}

	}

	checkAll() {
		let checkboxes = document.getElementsByName('agreementCheck');
		console.log(checkboxes)
		for (var i = 0; i < checkboxes.length; i++) {
			console.log(checkboxes[i])
		}

	}
}
