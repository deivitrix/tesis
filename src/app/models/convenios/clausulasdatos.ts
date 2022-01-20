import { ArticulosDatosModel } from "./articulosdatos";

export interface ClausulasDatosModel{
    id:number;
    nombre:string;
    tipo:string;
    articulos:ArticulosDatosModel[]
}