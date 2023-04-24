import { RolInterface } from './rol.model';
import { OficinaInterface } from './oficina.model';

export interface UserInterface {
    id: number,
    email: string,
    nombre: string,
    apellido: string,
    telefono: string | null,
    avatar: string,
    rol: RolInterface,
    oficina: OficinaInterface,
    habilitado: number,
    urlImagen: string
}


export class User implements UserInterface {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
    telefono: string | null;
    avatar: string;
    rol: RolInterface;
    oficina: OficinaInterface;
    habilitado: number;
    urlImagen: string;

    aprobacion_cbu                :any;
    aprobacion_gerencia_comercial :any;
    aprobacion_dpto_creditos      :any;
    aprobacion_dpto_finanzas      :any;
    confirmacion_pagos            :any;
    suscripto_notificaciones      : any;


    public nombreCompleto(): string {
        return `${this.nombre} ${this.apellido}`;
    }

    public isAdministrador():boolean {
        return this.rol.id === 1;
    }
}
