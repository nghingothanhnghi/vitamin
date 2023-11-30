
import { Pipe, PipeTransform } from '@angular/core';
import { ConvertUtil } from '@app/common/util/convert.util';

@Pipe({ name: "setComma" })
export class SetCommaPipe implements PipeTransform {

  constructor() {}

  transform(value: String | Number | string | number | undefined): String {
    if (!value) {
      return "0";
    }
    return ConvertUtil.setComma(value);
  }
}