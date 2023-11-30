import { environment } from "@enviroments/environment";
import { AuthUtil } from "./auth.util";

export class CartUtil {
  static getParamsAddToCart(pdtCd: string, qty: number, kindCd: string): any {
    let member = AuthUtil.getLoginedInfo();
    if (member) {
      let params = {
        comId: environment.comId,
        userid: member.userid,
        userKindCd: member.userKindCd,
        cntCd: member.cntCd,
        pathCD: environment.comCd + "T30",
        pdtCd: pdtCd,
        kindCD: environment.comCd + kindCd,
        qty: qty,
        workUser: member.userid,
        workKind: "M",
        directYN: "Y"
      };
      return params;
    }
    return null;
  }
}