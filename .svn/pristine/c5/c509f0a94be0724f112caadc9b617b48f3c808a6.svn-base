
import { Pipe, PipeTransform } from '@angular/core';
import { LangConstant } from '@app/common/constant/lang.constant';
import { ValidationUtil } from '@app/common/util/validation.util';

@Pipe({ name: "stringDate" })
export class StringDatePipe implements PipeTransform {

  constructor() {}

  transform(value: string | String, lang: string, format: string | null): string {
    if (ValidationUtil.isNotNullAndNotEmpty(value)) {
      if (lang === LangConstant.LANG_KR) {
        if (format === ".") {
          return value.substring(0, 4) + "." + value.substring(4, 6) + "." + value.substring(6, 8);
        } else {
          return value.substring(0, 4) + "년" + value.substring(4, 6) + "월" + value.substring(6, 8) + "일";
        }
      }
    }
    return "";
  }
}