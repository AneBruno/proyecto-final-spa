import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
let EmpresaHelper = class EmpresaHelper {
    obtenerNombreEmpresa(empresa) {
        let abreviacion = empresa.abreviacion;
        if (abreviacion) {
            return abreviacion;
        }
        else {
            let nombre = empresa.razon_social;
            if (nombre.length > 14) {
                return nombre.substr(0, 14) + '...';
            }
            else {
                return nombre;
            }
        }
    }
};
EmpresaHelper = __decorate([
    Injectable({
        providedIn: 'root'
    })
], EmpresaHelper);
export { EmpresaHelper };
//# sourceMappingURL=empresa.helper.js.map