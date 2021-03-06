
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseAuthComponent } from './base-auth/base-auth.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '', component: BaseAuthComponent,
    children: [
      {
        path:'',
        redirectTo: 'login', pathMatch: 'full'
      },
      {
        path: 'login', component: LoginComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
