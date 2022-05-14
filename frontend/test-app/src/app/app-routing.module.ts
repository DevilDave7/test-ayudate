import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { UserComponent } from './Components/user/user.component';
import { AuthenticateGuard } from './Guard/authenticate.guard';
import { UserFormComponent } from './Components/user-form/user-form.component';



const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthenticateGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user/:userId',
    component: UserComponent,
    canActivate:[AuthenticateGuard]

  },
  {
    path: 'nuevo',
    component: UserFormComponent,
    canActivate: [AuthenticateGuard]
  },
  {
    path: 'editar/:userId',
    component: UserFormComponent,
    canActivate: [AuthenticateGuard]
  },
  {
    path: '**',
    component: HomeComponent
  }
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
