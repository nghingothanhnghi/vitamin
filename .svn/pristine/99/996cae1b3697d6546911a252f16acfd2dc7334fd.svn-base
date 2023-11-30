
import { Pipe, PipeTransform } from '@angular/core';
import { ConvertUtil } from '@app/common/util/convert.util';

@Pipe({ name: "setTwoDigitPad" })
export class SetTwoDigitPadPipe implements PipeTransform {

  constructor() {}

  transform(value: String | Number): String {
    return ConvertUtil.convertToZeroDecimal(value);
  }
}