import { MemberModel } from "@app/models/system/member.model";
import { ValidationUtil } from "./validation.util";

export class AuthUtil {
  static readonly TIME_MIN_EXPIRED = 20 * 60 * 1000;

  static actionLogOut(){
    localStorage.removeItem('member');
    localStorage.removeItem('lastAction');
    setTimeout(()=>{
      console.log("Your Session Expired due to longer Inactivity, Login Again To Continue");
    },10000);
    
  }
  static isSessionExpired(): boolean {
    let lastAction = localStorage.getItem('lastAction');
    if(lastAction){
      const now = Date.now();
      const timeLeft = parseInt(lastAction) + AuthUtil.TIME_MIN_EXPIRED;
      const diff = timeLeft - now;
      return diff <= 0;
    }else{
      return true
    }
  }

  static getLoginedInfo(): MemberModel | null {
    let str = localStorage.getItem("member");
    if (ValidationUtil.isNotNullAndNotEmpty(str)) {
      return JSON.parse(str + "");
    }
    return null;
  }

  static isLogined(): boolean {
    return ValidationUtil.isNotNullAndNotEmpty(AuthUtil.getLoginedInfo());
  }

}