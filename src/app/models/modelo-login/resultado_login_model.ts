import { Usuario } from './../usuario/usuario_model';
export interface ResultadoLoginModel{
    estado:boolean;
    mensaje:string;
    Usuario:Usuario;
}