import { Component } from '@angular/core';
import { PathImagenesService } from './services/path-imagenes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tesisfinal1';
  constructor(private _pathimagenes:PathImagenesService){
    this._pathimagenes.path=this.path;
    this._pathimagenes.pathtwiter=this.pathtwiter;
    this._pathimagenes.pathin=this.pathin;
    this._pathimagenes.pathlog=this.pathlog;
    this._pathimagenes.pathhome=this.pathhome;
    this._pathimagenes.pathentrar=this.pathentrar;
    this._pathimagenes.pathcrs=this.pathcrs;
    this._pathimagenes.pathcrs2=this.pathcrs2;
    this._pathimagenes.pathbiblioteca=this.pathbiblioteca;
    this._pathimagenes.pathcapacitaciones=this.pathcapacitaciones;
    this._pathimagenes.pathpregrado=this.pathpregrado;
    this._pathimagenes.pathinvestigacion=this.pathinvestigacion;
    this._pathimagenes.pathmaestria=this.pathmaestria;
    this._pathimagenes.pathdoctorado=this.pathdoctorado;
    this._pathimagenes.pathmision=this.pathmision;
    this._pathimagenes.pathvision=this.pathvision;
    this._pathimagenes.pathlogoutm=this.pathlogoutm;
    this._pathimagenes.pathbibliotecavirtual=this.pathbibliotecavirtual;
    this._pathimagenes.pathpaginacapacitaciones=this.pathpaginacapacitaciones;
    this._pathimagenes.pathpaginapregrado=this.pathpaginapregrado;
    this._pathimagenes.pathpaginainvestigacion=this.pathpaginainvestigacion;
    this._pathimagenes.pathpaginamaestrias=this.pathpaginamaestria;
    this._pathimagenes.pathpaginadoctorados=this.pathpaginadoctorado;
    this._pathimagenes.pathrecuperarcorreo=this.pathrecuperarcorreo;
    this._pathimagenes.pathavatarperfil=this.pathavatarperfil;
    this._pathimagenes.pathimagendefecto=this.pathimagendefecto;
    this._pathimagenes.pathimagencapacitaciones=this.pathimagencapacitaciones;
    this._pathimagenes.pathimagenpregrado=this.pathimagenpreprado;
    this._pathimagenes.pathimageninvestigacion=this.pathimageninvestigacion;
    this._pathimagenes.pathimagenmaestria=this.pathimagenmaestria;
    this._pathimagenes.pathimagendoctorado=this.pathimagendoctorado;
  }

  //variables de las path de las imagenes del programa 
  path='../assets/img/fb.png';
  pathtwiter='../assets/img/tw.png';
  pathin='../assets/img/in.png';
  pathlog='../assets/img/logo.png';
  pathhome='../assets/img/home.png';
  pathentrar='../assets/img/entrar.png';
  pathcrs='../assets/img/civil.jpg';
  pathcrs2='../assets/img/civil.jpg';
  pathbiblioteca='../assets/img/book-bookmark-icon_34486.png';
  pathcapacitaciones='../assets/img/2730389-brain-divide-inkcontober-sains_112694.png';
  pathpregrado='../assets/img/65_85307.png';
  pathinvestigacion='../assets/img/40_113663.png';
  pathmaestria='../assets/img/bookshelf_icon-icons.com_54414.png';
  pathdoctorado='../assets/img/iconfinder-481-university-bank-campus-court-4212926_114964.png';
  pathmision='../assets/img/light-bulb-icon_34400.png';
  pathvision='../assets/img/vision_view_eye_icon_153887.png';
  pathlogoutm='../assets/img/antes.png';
  pathbibliotecavirtual='../assets/img/biblio.png';

  pathpaginacapacitaciones='../assets/img/BECAS.jpg';
  pathpaginapregrado='../assets/img/PREGRADO.jpg';
  pathpaginainvestigacion='../assets/img/INVESTIGACION.jpg';
  pathpaginamaestria='../assets/img/MAESTRIA.jpg';
  pathpaginadoctorado='../assets/img/DOCTORADO.jpg';

  pathrecuperarcorreo='../assets/img/candado1.png';

  pathavatarperfil='../assets/img/avatar_perfil.png';
  pathimagendefecto='../assets/img/imagendefecto.jpg';
  
  pathimagencapacitaciones='../assets/img/capacitaciones1.png';
  pathimagenpreprado='../assets/img/pregrado.png';
  pathimageninvestigacion='../assets/img/investigacion.png';
  pathimagenmaestria='../assets/img/maestria.png';
  pathimagendoctorado='../assets/img/doctorado.png';


}
