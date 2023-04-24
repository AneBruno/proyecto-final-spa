export declare type AccessGroup = { 
    [k: string]: AccesoInterface[]
}

export interface AccesoInterface {
    id: number,
    nombre: string,
    descripcion: string | null,
    grupo: string,
    orden: number
}