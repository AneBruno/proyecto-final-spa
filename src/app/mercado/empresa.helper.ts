import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class EmpresaHelper {
    public obtenerNombreEmpresa(empresa: any): string {
        let abreviacion = empresa.abreviacion;
        if (abreviacion) {
            return abreviacion;
        } else {
            let nombre = empresa.razon_social;
            if (nombre.length > 16) {
                return nombre.substr(0, 16) + '...';
            } else {
                return nombre;
            }
        }
    }
}
