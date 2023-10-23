import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import * as moment from "moment";
let FechaEntregaHelper = class FechaEntregaHelper {
    constructor() {
        this.anioActual = Number(moment().format().substring(0, 3));
        this.diasFebrero = this.calculaDiasFebrero();
        this.diasMeses = [31, this.diasFebrero, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
    calculaDiasFebrero() {
        return (((this.anioActual % 4 == 0) && (this.anioActual % 100 != 0)) || this.anioActual % 400 == 0) ? 29 : 28;
    }
    calculaEntrega(row) {
        var entrega = row.entrega;
        if (entrega == 'LIMIT') {
            var fecha = row.fecha_entrega_fin;
            var dia = fecha.substring(8, 10);
            var mes = Number(fecha.substring(5, 7));
            return ("Dispo h/ " + dia + "-" + this.obtenerMes(mes).replace(/\b\w/g, l => l.toUpperCase()));
        }
        if (entrega == 'FORWARD') {
            var dia_desde = row.fecha_entrega_inicio.substring(8, 10);
            var mes_desde = Number(row.fecha_entrega_inicio.substring(5, 7));
            var dia_hasta = row.fecha_entrega_fin.substring(8, 10);
            var mes_hasta = Number(row.fecha_entrega_fin.substring(5, 7));
            if (mes_desde == mes_hasta && dia_desde == "01" && dia_hasta == this.diasMeses[mes_hasta - 1]) {
                return this.obtenerMes(mes_desde).replace(/\b\w/g, l => l.toUpperCase());
            }
            if (dia_desde == "01" && dia_hasta == this.diasMeses[mes_hasta - 1]) {
                return (this.obtenerMes(mes_desde).toUpperCase() + '-' + this.obtenerMes(mes_hasta).toUpperCase());
            }
            return (dia_desde + this.obtenerMes(mes_desde).replace(/\b\w/g, l => l.toUpperCase()).substring(0, 3) + " / " + dia_hasta + this.obtenerMes(mes_hasta).replace(/\b\w/g, l => l.toUpperCase()).substring(0, 3));
        }
        if (entrega == 'DISPONIBLE') {
            return 'Disponible';
        }
        if (entrega == 'CONTRACTUAL') {
            return 'Contractual';
        }
    }
    obtenerMes(numero) {
        return [
            'enero',
            'febrero',
            'marzo',
            'abril',
            'mayo',
            'junio',
            'julio',
            'agosto',
            'septiembre',
            'octubre',
            'noviembre',
            'diciembre'
        ][numero - 1];
    }
    addOneMonth(fecha) {
        return moment(fecha).add(31, 'days').format('YYYY-MM-DD');
    }
    getToday() {
        return moment().format('YYYY-MM-DD');
    }
};
FechaEntregaHelper = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FechaEntregaHelper);
export { FechaEntregaHelper };
//# sourceMappingURL=fecha-entrega.helper.js.map