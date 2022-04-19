import { imagenes_convenios } from "./imagenconvenios";

export interface ImagenSolicitudes{
    id:number;
    imagenescon_id:number;
    imagenes_solicitudes:imagenes_convenios;
    estado:string;
}