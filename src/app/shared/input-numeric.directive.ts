import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[app-input-numeric]'
})
export class InputNumericDirective {

    constructor(
        private element: ElementRef
    ) 
    {
        setTimeout(()=>{
            let el = this.element.nativeElement;
            let parteEntera = el.value.split(',')[0];
            let parteDecimal = el.value.split(',')[1];
            if(parteDecimal){
                el.value = this.formatValue(parteEntera) + ',' + parteDecimal;
            }
            else{
                el.value = this.formatValue(parteEntera);
            }
        },1)
        
    }

    @HostListener('keydown', ['$event'])
    public onKeydown(event: any) {
        if (event.key === '.') {
            if (String(event.target.value).lastIndexOf(',') !== -1) {
                return false;
            }
            event.target.value = `${event.target.value},`;
            return false;
        }
    }

    @HostListener('keypress', ['$event'])
    public onKeypress(event: any): boolean {
        
        // Bug en el teclado numérico de Chrome en Android
        if (event.key === 'Unidentified') {
            return true;
        }

        // Prevenimos la inserción de cualquier tecla que no sea un número
        if(event.key === ','){
            if(String(this.element.nativeElement.value).lastIndexOf(',') === -1){
                return true;
            }
        }
        return /\d/.test(event.key);
    }

    @HostListener('ngModelChange')
    public onChange() {
        let el = this.element.nativeElement;
        el.value = this.formatValue(el.value);
        //event.target.value = this.formatValue(event.target.value);
    }

    @HostListener('keyup', ['$event'])
    public onKeyup(event: any) {

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

    private formatValue(value: any) {
        // Separa en parte entera y decimal
        let parts = String(value).split(',');

        // Toma la parte entera y la formatea
        parts[0] = `${parts[0]}`.replace(/\./g, '').split('').reverse().map((d, i) => {
            return (i) % 3 === 0 && i>1 ? d + '.' : d;
        }).reverse().join('');

        // une las partes y devuelve
        return parts.join(',');
    }

}
