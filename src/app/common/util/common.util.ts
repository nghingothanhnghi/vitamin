import { ValidationUtil } from '@app/common/util/validation.util';
import { environment } from '@enviroments/environment';
import { LangConstant } from '../constant/lang.constant';
import { AuthUtil } from './auth.util';
import { ConvertUtil } from './convert.util';

export class CommonUtils {
    static getMessages(): string {
        return 'messages.' + CommonUtils.getLangMessage();
      }
    
      static getLangMessage(): string {
        let res = environment.default_lang.toLowerCase();
        let lang = CommonUtils.getLang();
    
        switch (lang) {
          case 'kr': 
            res = 'kr';
            break;
          case 'en': 
            res = 'en';
            break;
          case 'us': 
            res = 'en';
            break;
          default:
            res = 'en';
            break;
        }
    
        return res;
      }
    
      static getLang(): string {
        let loginedInfo = AuthUtil.getLoginedInfo();
        let lang = sessionStorage.getItem(LangConstant.STR_LANG);
    
        if (ValidationUtil.isNullOrEmpty(lang)) {
          if (loginedInfo) {
            lang = ConvertUtil.convertToSring(loginedInfo.ctrCd);
          } else {
            lang = environment.default_lang;
          }
          sessionStorage.setItem(LangConstant.STR_LANG, lang);
        }
    
        return ConvertUtil.convertToSring(lang).toLowerCase();
      }
      
}

