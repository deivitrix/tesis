import { Imagen } from './imagen';

export interface ImagenSolicitudes{
    id:number;
    imagenescon_id:Imagen[];
    estado:string;
}