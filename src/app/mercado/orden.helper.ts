import { EmpresaHelper } from "./empresa.helper";

export class OrdenHelper {

    public obtenerAbreviacion(orden: any): string {
        return [
            `${orden.created_at}`.substring(0,10).split('-').reverse().join('-'),
            (new EmpresaHelper).obtenerNombreEmpresa(orden.empresa),
            orden.producto.nombre,
            `${orden.volumen}tn`,
            orden.moneda,
            orden.precio
        ].join('-');
    }
}