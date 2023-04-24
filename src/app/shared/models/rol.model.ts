import { AccesoInterface, AccessGroup } from './acceso.model';

export interface RolInterface {
    id: number,
    nombre: string,
    accesos: AccessGroup,
}