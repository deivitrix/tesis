import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarconvenionombre'
})
export class BuscarconvenionombrePipe implements PipeTransform {

  transform(array: any[] | null, text:string): any[] | null {

    if(text == ''){
      return array;
    }

    text = text.toLocaleLowerCase().trim();

   if(!array){
    return array;
   }

   return array.filter((item:any) => {
     return item.titulo_convenio.toLocaleLowerCase().includes(text);
   });
  }
}
