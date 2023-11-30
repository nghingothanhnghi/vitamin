
import { Pipe, PipeTransform } from '@angular/core';
import { LangConstant } from '@app/common/constant/lang.constant';
import { ValidationUtil } from '@app/common/util/validation.util';

@Pipe({ name: "mobile" })
export class MobilePipe implements PipeTransform {

  constructor() {}

  transform(value: string | String, lang: string): string {
    if (ValidationUtil.isNotNullAndNotEmpty(value)) {
      if (lang === LangConstant.LANG_KR) {
        value = value.replace(/-/gi, "");
        return value.substring(0, 3) + "-" + value.substring(3, 7) + "-" + value.substring(7);
      }
    }
    return "";
  }
}