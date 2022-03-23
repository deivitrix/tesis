import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarusuarios'
})
export class BuscarusuariosPipe implements PipeTransform {

  transform(array: any[] | null, text:string): any[] | null {

    if(text == ''){
      return array;
    }

    text = text.toLocaleLowerCase().trim();

   if(!array){
    return array;
   }

   return array.filter((item:any) => {
     return item.apellidos.toLocaleLowerCase().includes(text) 
     || item.nombres.toLocaleLowerCase().includes(text) 
     || item.cedula.toLocaleLowerCase().includes(text);
   });
  }

}
