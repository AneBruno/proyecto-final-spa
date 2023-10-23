import { __decorate } from "tslib";
import { Directive, HostListener } from '@angular/core';
let InputNumericDirective = class InputNumericDirective {
    constructor(element) {
        this.element = element;
        setTimeout(() => {
            let el = this.element.nativeElement;
            let parteEntera = el.value.split(',')[0];
            let parteDecimal = el.value.split(',')[1];
            if (parteDecimal) {
                el.value = this.formatValue(parteEntera) + ',' + parteDecimal;
            }
            else {
                el.value = this.formatValue(parteEntera);
            }
        }, 1);
    }
    onKeydown(event) {
        if (event.key === '.') {
            if (String(event.target.value).lastIndexOf(',') !== -1) {
                return false;
            }
            event.target.value = `${event.target.value},`;
            return false;
        }
    }
    onKeypress(event) {
        // Bug en el teclado numérico de Chrome en Android
        if (event.key === 'Unidentified') {
            return true;
        }
        // Prevenimos la inserción de cualquier tecla que no sea un número
        if (event.key === ',') {
            if (String(this.element.nativeElement.value).lastIndexOf(',') === -1) {
                return true;
            }
        }
        return /\d/.test(event.key);
    }
    onChange() {
        let el = this.element.nativeElement;
        el.value = this.formatValue(el.value);
        //event.target.value = this.formatValue(event.target.value);
    }
    onKeyup(event) {
        // Si no tiene caracteres numéricos no hacemos nada
        // No se incluye la , porque si hay una "," ya no hay
        // que trabajar decimales.
        if (!/^(\d)([0-9\.]*)(\d)$/.test(event.target.value)) {
            return;
        }
        // Se transforma en array
        // Se invierte, y se agrega un punto cada 3 dígitos
        // Se vuelve a invertir y se une.
        let value = this.formatValue(event.target.value);
        event.target.value = value;
        return true;
    }
    formatValue(value) {
        // Separa en parte entera y decimal
        let parts = String(value).split(',');
        // Toma la parte entera y la formatea
        parts[0] = `${parts[0]}`.replace(/\./g, '').split('').reverse().map((d, i) => {
            return (i) % 3 === 0 && i > 1 ? d + '.' : d;
        }).reverse().join('');
        // une las partes y devuelve
        return parts.join(',');
    }
};
__decorate([
    HostListener('keydown', ['$event'])
], InputNumericDirective.prototype, "onKeydown", null);
__decorate([
    HostListener('keypress', ['$event'])
], InputNumericDirective.prototype, "onKeypress", null);
__decorate([
    HostListener('ngModelChange')
], InputNumericDirective.prototype, "onChange", null);
__decorate([
    HostListener('keyup', ['$event'])
], InputNumericDirective.prototype, "onKeyup", null);
InputNumericDirective = __decorate([
    Directive({
        selector: '[app-input-numeric]'
    })
], InputNumericDirective);
export { InputNumericDirective };
//# sourceMappingURL=input-numeric.directive.js.map