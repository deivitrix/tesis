import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/modelo-login/login';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';
import { MensajeLoginComponent } from '../mensaje-login/mensaje-login.component';

//Alertas
import Swal from 'sweetalert2';
import 'animate.css';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  pathLogoUTM: string;
  piepagina = 'Flotante';
  usuario_login = '';
  contrasena = '';
  loading = false;
  userLogin: LoginModel = { correo: '', contrasena: '' };
  constructor(
    private _pathimagenes: PathImagenesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    private _login: GeneralLoginService
  ) {
    this.pathLogoUTM = this._pathimagenes.pathlogoutm;
  }

  ngOnInit(): void {}

  ingresarlogin() {
    if (this.usuario_login.length == 0) {
      this.snackBar.openFromComponent(MensajeLoginComponent, {
        data: {
          titulo: 'Error.....',
          mensaje: 'Ingresar correo y/o contraseña',
          buttonText: '',
          icon: 'warning',
        },
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        panelClass: 'error',
      });
      return;
    }
    if (this.contrasena.length == 0) {
      this.snackBar.openFromComponent(MensajeLoginComponent, {
        data: {
          titulo: 'Error.....',
          mensaje: 'Ingresar correo y/o contraseña',
          buttonText: '',
          icon: 'warning',
        },
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        panelClass: 'error',
      });
      return;
    }
    this.loading = true;
    // this.userLogin.correo=this.usuario_login;
    // this.userLogin.contrasena=this.contrasena;
    // let json={usuario:this.userLogin};
    let json = { email: this.usuario_login, password: this.contrasena };

    this._login.loginUTM(json).subscribe((res: any) => {
      this.loading = false;

      if (res.error == true) {
        var remplazar = res.error_text;
        var reemplazar2 = remplazar.includes('<p>');
        if (reemplazar2 == false) {
          Swal.fire({
            showClass: {
              popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp',
            },
            title: 'Contraseña incorrecta',
            icon: 'warning',
          });
        } else {
          var etiqueta1 = '';
          etiqueta1 = remplazar.replace('<p>', '¿');
          var etiqueta2 = etiqueta1.replace('</p>', '¿');
          var cortar = etiqueta2.split('¿');

          Swal.fire({
            showClass: {
              popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp',
            },
            title: cortar[1],
            icon: 'warning',
          });
        }
      }

      if (res.error == false) {
        
        this._login.login(res.id_personal)
        .subscribe((res1:any)=>{
          if(res1.estado==true)
          {
            if(res1.tipo=="I"){
              if(res1.usuario.estado=="A")
              {
                this.snackBar.openFromComponent(MensajeLoginComponent,{
                          data:{
                            titulo:'Bienvenido',
                            mensaje:'Bienvenido al Sistema UTMRICB',
                           buttonText:'',
                           icon:'success'
                          },
                          duration:1500,
                          horizontalPosition:'center',
                          verticalPosition:'top',
                          panelClass:'success'
                        });
                          this.loading=false;
                          // guardar en cache
                       sessionStorage.setItem('isRedirected','true');
                       localStorage.setItem("id_personal",res1.usuario.id);
                      this.router.navigate(['/utmricb/principal']);
              }
              else{
                this.loading=false;
        this.snackBar.openFromComponent(MensajeLoginComponent,{
         data:{
         titulo:'Error.....',
         mensaje:"Este usuario no encuentra activo!!!",
         buttonText:'',
         icon:'warning'
        },
        duration:1000,
        horizontalPosition:'end',
        verticalPosition:'bottom',
        panelClass:'error'
        });
        this.contrasena="";
        return;
        
        }
              
            }
            
          //Modulo de Movilidad
          else if (res1.tipo=="M"){
            this.snackBar.openFromComponent(MensajeLoginComponent,{
              data:{
                titulo:'Bienvenido',
                mensaje:'Bienvenido al Sistema UTMRICB',
               buttonText:'',
               icon:'success'
              },
              duration:1500,
              horizontalPosition:'center',
              verticalPosition:'top',
              panelClass:'success'
            });
              this.loading=false;
              // guardar en cache
           sessionStorage.setItem('isRedirected','true');
           localStorage.setItem("id_personal",res.id_personal);
          this.router.navigate(['/movilidad/movilidad']);
          }
          
          //Modulo de Becas
          else if (res1.tipo=="B"){
            this.snackBar.openFromComponent(MensajeLoginComponent,{
              data:{
                titulo:'Bienvenido',
                mensaje:'Bienvenido al Sistema UTMRICB',
               buttonText:'',
               icon:'success'
              },
              duration:1500,
              horizontalPosition:'center',
              verticalPosition:'top',
              panelClass:'success'
            });
              this.loading=false;
              // guardar en cache
           sessionStorage.setItem('isRedirected','true');
           localStorage.setItem("id_personal",res.id_personal);
          this.router.navigate(['/becas/becas']);

          }else{
            Swal.fire({
              showClass: {
                popup: 'animate__animated animate__fadeInDown',
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
              },
              title: res.mensaje,
              icon: 'warning',
            });
    
          }
        }
          
        }
        )

      }
    });

    
  }
}
