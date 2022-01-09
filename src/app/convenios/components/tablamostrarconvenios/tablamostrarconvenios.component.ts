import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConveniosServicesService } from 'src/app/services/generalConvenios/convenios-services.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ConveniosTipoModel } from 'src/app/models/convenios/conveniostipos';
import { ConveniosTiposTableModel } from 'src/app/models/convenios/conveniostipostable';

@Component({
  selector: 'app-tablamostrarconvenios',
  templateUrl: './tablamostrarconvenios.component.html',
  styleUrls: ['./tablamostrarconvenios.component.css']
})
export class TablamostrarconveniosComponent implements OnInit {
  selector:FormGroup;
  displayedColumns: string[] = ['position', 'titulo_convenio' ,'f_creacion', 'acciones'];
  dataSource = new MatTableDataSource<ConveniosTiposTableModel>();
  tabla=false;
  conveniotipo: ConveniosTipoModel[]=[];
  conveniotipoaux: ConveniosTipoModel[]=[];
  show=true;
   
  listatabla:ConveniosTiposTableModel[]=[];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  
  constructor(
    private convenios:ConveniosServicesService,private mostrar:FormBuilder) 
    { 
      this.selector=mostrar.group({
        conveniostipo:['',Validators.required]
      });

    }

    applyFilter(event:Event)
    {
      const filterValue=(event.target as HTMLInputElement).value;
      this.dataSource.filter=filterValue.trim().toLowerCase();
    }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cambioConveniosTipos()
  {
    if(this.selector.get('conveniostipo')?.value=="P")
    {
      this.listatabla=[];
      this.tabla=true;
      this.convenios.getconveniostipo("P")
    .subscribe((res:any) => {
      this.conveniotipoaux=res;
      var numero=0;
      this.conveniotipoaux.forEach((item:ConveniosTipoModel,indice:number)=>{
         var item2:ConveniosTiposTableModel={position:0,id:0,f_creacion:'',titulo_convenio:'',PDF:''};
        if(item.estado=="A")
        {
           numero++;
           item2.position=numero;
           item2.id=item.id;
           item2.titulo_convenio=item.titulo_convenio;
           item2.f_creacion=item.f_creaciondoc;
           item2.PDF=item.PDF;
           this.listatabla.push(item2);
        }
      });
      console.log(this.listatabla);
      this.dataSource=new MatTableDataSource();
      this.dataSource=new MatTableDataSource(this.listatabla);
      this.dataSource.paginator = this.paginator;
      
    });
      
    }
    if(this.selector.get('conveniostipo')?.value=="A")
    {
      this.listatabla=[];
      this.tabla=true;
      this.convenios.getconveniostipo("A")
    .subscribe((res:any) => {
      this.conveniotipoaux=res;
      var numero=0;
      this.conveniotipoaux.forEach((item:ConveniosTipoModel,indice:number)=>{
         var item2:ConveniosTiposTableModel={position:0,id:0,f_creacion:'',titulo_convenio:'',PDF:''};
        if(item.estado=="A")
        {
           numero++;
           item2.position=numero;
           item2.id=item.id;
           item2.titulo_convenio=item.titulo_convenio;
           item2.f_creacion=item.f_creaciondoc;
           item2.PDF=item.PDF;
           this.listatabla.push(item2);
        }
      });
      this.dataSource=new MatTableDataSource();
      
      this.dataSource=new MatTableDataSource(this.listatabla);
      this.dataSource.paginator = this.paginator;
    });
      
    }
    if(this.selector.get('conveniostipo')?.value=="G")
    {
      this.listatabla=[];
      this.tabla=true;
      this.convenios.getconveniostipo("G")
    .subscribe((res:any) => {
      this.conveniotipoaux=res;
      var numero=0;
      this.conveniotipoaux.forEach((item:ConveniosTipoModel,indice:number)=>{
         var item2:ConveniosTiposTableModel={position:0,id:0,f_creacion:'',titulo_convenio:'',PDF:''};
        if(item.estado=="A")
        {
           numero++;
           item2.position=numero;
           item2.id=item.id;
           item2.titulo_convenio=item.titulo_convenio;
           item2.f_creacion=item.f_creaciondoc;
           item2.PDF=item.PDF;
           this.listatabla.push(item2);
        }
      });
      console.log(this.listatabla);
      this.dataSource=new MatTableDataSource();
      this.dataSource=new MatTableDataSource(this.listatabla);
      this.dataSource.paginator = this.paginator;
    });
      
    }
  
  }

}
