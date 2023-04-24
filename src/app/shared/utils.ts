import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class Utils {
    constructor() {       
    }

    public formatNumero (num : string) : string {
        let array = num.split("").reverse();
        let string : string = '';
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if((index+1)%3 === 0){
                string = string + array[index] +'.';
            }
            else{
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

    public formatNumeroConDecimales (num : string , limitDecimales : number = 2){
        let arraynum = num.split('.');
        if(arraynum[1]){
            return this.formatNumero(arraynum[0]) + ',' + arraynum[1].substring(0,limitDecimales);
        }
        return this.formatNumero(arraynum[0]); 

    }
    
    public fomatNumeroConOSinDecimales(num : string) : string {
        let decimal = false;
        Array.from(num).forEach(element => {
            if(element === ','){
                decimal = true
            }
        });

        if(decimal){
            let arraynum = num.split(',');
            return this.formatNumero(arraynum[0]) + ',' + arraynum[1][0];
        }
        return this.formatNumero(num);
    }
            
        


    public quitarPuntos(s : string) : string {
        let array = s.split('.');
        s = '';
        array.forEach(element => {
            s = s + element
        });
        return s;
    }
}