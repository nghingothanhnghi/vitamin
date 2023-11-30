
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: "replaceStr" })
export class ReplaceStr implements PipeTransform {

  constructor() {
  }

  transform(value: string, replValue1: string, replValue2: string): string {
    return value.replace(replValue1, replValue2)
  }
}