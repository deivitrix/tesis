import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionavanzadaRoutingModule } from './configuracionavanzada-routing.module';
import { BaseconfiguracionavanzadaComponent } from './baseconfiguracionavanzada/baseconfiguracionavanzada.component';
import { NavbarconfiguracionavanzadaComponent } from './components/navbarconfiguracionavanzada/navbarconfiguracionavanzada.component';
import { RegistroactividadesPaginaComponent } from './paginas/registroactividades-pagina/registroactividades-pagina.component';
import { ModificarPaginaPrincipalComponent } from './paginas/modificar-pagina-principal/modificar-pagina-principal.component';
import { LoadingconfiguracionavanzadaComponent } from './components/loadingconfiguracionavanzada/loadingconfiguracionavanzada.component';
import { SpinnerconfiguracionavanzadaComponent } from './components/spinnerconfiguracionavanzada/spinnerconfiguracionavanzada.component';
import { SelectormodificarpaginaprincipalComponent } from './components/selectormodificarpaginaprincipal/selectormodificarpaginaprincipal.component';

//material
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import{FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
//editor de texto
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



import { IniciopaginaprincipalmodificarComponent } from './components/iniciopaginaprincipalmodificar/iniciopaginaprincipalmodificar.component';
import { NosotrospaginaprincipalmodificarComponent } from './components/nosotrospaginaprincipalmodificar/nosotrospaginaprincipalmodificar.component';
import { ConveniospaginaprincipalmodificarComponent } from './components/conveniospaginaprincipalmodificar/conveniospaginaprincipalmodificar.component';
import { BecaspaginaprincipalmodificarComponent } from './components/becaspaginaprincipalmodificar/becaspaginaprincipalmodificar.component';
import { MovilidadpaginaprincipalmodificarComponent } from './components/movilidadpaginaprincipalmodificar/movilidadpaginaprincipalmodificar.component';
import { GaleriaInterfazComponent } from './components/galeria-interfaz/galeria-interfaz.component';
import { IngresarbecasComponent } from './components/ingresarbecas/ingresarbecas.component';
import { PipesModule } from '../pipes/pipes.module';
import { DialogingresarbecasComponent } from './components/dialogingresarbecas/dialogingresarbecas.component';
import { TablabecasnivelbodyComponent } from './components/tablabecasnivelbody/tablabecasnivelbody.component';
import { DialogingresarbecasbodyComponent } from './components/dialogingresarbecasbody/dialogingresarbecasbody.component';
import { UsuariosDricbComponent } from './paginas/usuarios-dricb/usuarios-dricb.component';
import { TablausuariosComponent } from './components/tablausuarios/tablausuarios.component';
import { DialogusuariosComponent } from './components/dialogusuarios/dialogusuarios.component';
import { LogoSolicitudesComponent } from './paginas/logo-solicitudes/logo-solicitudes.component';
import { CambiarLogoSolicitudesComponent } from './components/cambiar-logo-solicitudes/cambiar-logo-solicitudes.component';
import { GalleriaComponent } from './components/galleria/galleria.component';


@NgModule({
  declarations: [
    BaseconfiguracionavanzadaComponent,
    NavbarconfiguracionavanzadaComponent,
    RegistroactividadesPaginaComponent,
    ModificarPaginaPrincipalComponent,
    LoadingconfiguracionavanzadaComponent,
    SpinnerconfiguracionavanzadaComponent,
    SelectormodificarpaginaprincipalComponent,
    IniciopaginaprincipalmodificarComponent,
    NosotrospaginaprincipalmodificarComponent,
    ConveniospaginaprincipalmodificarComponent,
    BecaspaginaprincipalmodificarComponent,
    MovilidadpaginaprincipalmodificarComponent,
    GaleriaInterfazComponent,
    IngresarbecasComponent,
    DialogingresarbecasComponent,
    TablabecasnivelbodyComponent,
    DialogingresarbecasbodyComponent,
    UsuariosDricbComponent,
    TablausuariosComponent,
    DialogusuariosComponent,
    LogoSolicitudesComponent,
    CambiarLogoSolicitudesComponent,
    GalleriaComponent
    
  ],
  imports: [
    CommonModule,
    ConfiguracionavanzadaRoutingModule,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTreeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FormsModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    PipesModule,
    CKEditorModule
  ]
})
export class ConfiguracionavanzadaModule { }
