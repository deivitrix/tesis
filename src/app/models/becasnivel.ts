import { BecasNivelBody } from './becasnivelbody';
export interface BecasNivel{
    id:number;
    estado:string;
    fecha_creacion:string;
    nombre:string;
    tipo:string;
    usuario_id:string;
    becas_nivel_body:BecasNivelBody[];
 }