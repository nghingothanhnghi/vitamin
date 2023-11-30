import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CardInstallModel } from "@app/models/shoppingmall/list-card-install.model";
import { PaymentCardResult } from "@app/models/shoppingmall/payment-card-result.model";
import { ResultProc } from "@app/models/system/result-proc.model";
import { environment } from "@enviroments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class KorPaymentService {
    constructor(private _http: HttpClient) { }

    getCardInstall(): Observable<CardInstallModel> {
        let url = `${environment.apiUrl}/list-card-install?comid=${environment.comId}`;

        return this._http.get<CardInstallModel>(url);
    }

    payCard(params: any): Observable<ResultProc> {
        let url = `${environment.apiUrl}/korpay/paycard`;

        return this._http.post<ResultProc>(url, params);
    }
}