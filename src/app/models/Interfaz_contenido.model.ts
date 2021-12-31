import { Interfaz } from "./Interfaz.model";

export interface Interfaz_contenido{
    id:number;
    id_interfazs:string;
    nombre:string;
    descripcion:string;
    urlimagen:string;
    estado:string;
    interfaz:Interfaz
}