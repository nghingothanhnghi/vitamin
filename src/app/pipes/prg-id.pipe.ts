
import { Pipe, PipeTransform } from '@angular/core';
import { ValidationUtil } from '@app/common/util/validation.util';

@Pipe({ name: "prgId" })
export class PrgIdPipe implements PipeTransform {

  constructor() {}

  transform(value: any): string {
    if (ValidationUtil.isNotNullAndNotEmpty(value) && typeof value === "string") {
      return value.replace(/\./gi, "-");
    }
    return "";
  }
}