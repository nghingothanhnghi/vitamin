
import { Pipe, PipeTransform } from '@angular/core';
import { SvgIconConstant } from '@app/common/constant/svg-icon.constant';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';

@Pipe({ name: "getPathSvg" })
export class getPathSvgPipe implements PipeTransform {

  constructor() {}

  transform(value: string, type: string): string {
    const svg = SvgIconConstant._mapSvgIcons.get(value);
    if (ValidationUtil.isNotNullAndNotEmpty(svg)) {
      if (type === "solid") {
        return ConvertUtil.convertToSring(svg?.solid);
      } else if (type === "color") {
        return ConvertUtil.convertToSring(svg?.color);
      }
    }
    return "";
  }
}