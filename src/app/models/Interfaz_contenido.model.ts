import { ImagenModel } from './imagen';
import { Interfaz } from "./Interfaz.model";

export interface Interfaz_contenido{
    id:number;
    id_interfazs:string;
    nombre:string;
    descripcion:string;
    estado:string;
    interfaz:Interfaz
    imagen_id:number;
    usuario_id:number;
    imagen:ImagenModel;
    PDF:string;
}