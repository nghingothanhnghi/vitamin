import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';

export class ChartUtils {


    static drawChartBar(selector: string) {
        if (ValidationUtil.isNullOrEmpty(selector) || typeof selector !== 'string') return;

        if (typeof selector === 'string' && !(selector.startsWith('.') || selector.startsWith('#'))) {
            selector = '#' + selector;
        }

        const affiliateMemberAnalysis = document.querySelector(selector);
        if (affiliateMemberAnalysis) {
            const valueRow: any = document.querySelector(selector + ' .value-row');

            const lis = valueRow.querySelectorAll(".value");
            const lisBar = valueRow.querySelectorAll(".bar");

            var max = 0;

            for (var i = 0; i < lis.length; i++) {
                let value = Number(ConvertUtil.convertToIntValue(lis[i].innerHTML));
                if (max <= value) {
                    max = value;
                }
            }

            for (var i = 0; i < lisBar.length; i++) {
                let value = Number(ConvertUtil.convertToIntValue(lis[i].innerHTML));
                var bar = lisBar[i];
                this.initBar(value, bar, max);
            }
        }
    }
    static initBar(value: number, bar: any, max: number) {
        var _height = value / max * 150;
        bar.style.height = _height + "px";
    }

}