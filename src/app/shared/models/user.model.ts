import { RolInterface } from './rol.model';
import { OficinaInterface } from './oficina.model';

export interface UserInterface {
    id: number,
    email: string,
    nombre: string,
    apellido: string,
    telefono: string | null,
    rol: RolInterface,
    habilitado: number,
    empresa_registro:string
}


export class User implements UserInterface {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
    telefono: string | null;
    rol: RolInterface;
    habilitado: number;
    empresa_registro: string;


    public nombreCompleto(): string {
        return `${this.nombre} ${this.apellido}`;
    }

    public isAdministrador():boolean {
        return this.rol.id === 1;
    }
}
