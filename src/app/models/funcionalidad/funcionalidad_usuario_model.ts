import { FuncionalidadModel } from './funcionalidad_model';
export interface FuncionalidadUsuario{
    fusuarios_id:number;
    usuario_id:number;
    funcion_id:number;
    estado:string;
    funcionalidad:FuncionalidadModel[];
}