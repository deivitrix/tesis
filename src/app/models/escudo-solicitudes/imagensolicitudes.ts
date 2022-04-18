import { ImagenModel } from './imagen';

export interface ImagenSolicitudes{
    id:number;
    imagenescon_id:ImagenModel;
    estado:string;
}