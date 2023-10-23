import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
let Utils = class Utils {
    constructor() {
    }
    formatNumero(num) {
        let array = num.split("").reverse();
        let string = '';
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if ((index + 1) % 3 === 0) {
                string = string + array[index] + '.';
            }
            else {
                string = string + array[index];
            }
        }
        array = string.split('').reverse();
        array[0] === '.' ? array.shift() : '';
        string = '';
        array.forEach(element => {
            string = string + element;
        });
        return string;
    }
    formatNumeroConDecimales(num, limitDecimales = 2) {
        let arraynum = num.split('.');
        if (arraynum[1]) {
            return this.formatNumero(arraynum[0]) + ',' + arraynum[1].substring(0, limitDecimales);
        }
        return this.formatNumero(arraynum[0]);
    }
    fomatNumeroConOSinDecimales(num) {
        let decimal = false;
        Array.from(num).forEach(element => {
            if (element === ',') {
                decimal = true;
            }
        });
        if (decimal) {
            let arraynum = num.split(',');
            return this.formatNumero(arraynum[0]) + ',' + arraynum[1][0];
        }
        return this.formatNumero(num);
    }
    quitarPuntos(s) {
        let array = s.split('.');
        s = '';
        array.forEach(element => {
            s = s + element;
        });
        return s;
    }
};
Utils = __decorate([
    Injectable({
        providedIn: 'root'
    })
], Utils);
export { Utils };
//# sourceMappingURL=utils.js.map