import { Pipe, PipeTransform } from '@angular/core';
import { ValidationUtil } from '@app/common/util/validation.util';


@Pipe({
  name: 'encode'
})
export class EncodePipe implements PipeTransform {

  ENCODE_TYPE_DATE:string | String = 'DATE';
  ENCODE_TYPE_PHONE:string | String = 'PHONE';
  ENCODE_TYPE_EMAIL:string | String = 'EMAIL';
  ENCODE_TYPE_ADDRESS:string | String = 'ADDRESS';


  transform(value:string | String, type:string | String): unknown {
    if (ValidationUtil.isNullOrEmpty(value) || typeof value !== 'string') return '';

    if (type === this.ENCODE_TYPE_DATE) {
        return value.substring(0, 4) + '-**-**';
    } else if (type === this.ENCODE_TYPE_PHONE) {
        return value.substring(0, 8) + '*****';
    } else if (type === this.ENCODE_TYPE_EMAIL) {
        const temp = value.split('@');
        if (temp[0].length <= 4) {
            let first = '';
            for (let i = 0; i < temp[0].length; i++) {
                first += '*';
            }
            return first + '@' + temp[1];
        }
        return temp[0].substring(0, temp[0].length - 4) + '****' + '@' + temp[1];
    } else if (type === this.ENCODE_TYPE_ADDRESS) {
        return '****';
    }
    
    return '';
  }

}
