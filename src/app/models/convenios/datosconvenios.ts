import { ClausulasDatosModel } from './clausulasdatos';
export interface DatosConvenioModel{
    id_usuario:number;
    id_tipoconvenio:number;
    id_tipoespecifico:number;
    nombre_convenio:string;
    comparecientes:string;
    clausulas:ClausulasDatosModel[]
}