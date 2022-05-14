import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/responseInterface';
import { UserService } from 'src/app/Services/user.service';

import {confirmAlert, fireAlert} from '../../Helpers/alert'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public users: User[] = [];
  loading: boolean = true;

  loadUsers(){
    this.loading = true;
    this._userService.getUsers()
      .subscribe(res=>{
        this.loading = false;
        this.users = res.result;
      })
  }

  logout(){
    confirmAlert('Estas seguro de cerrar sesion?','Cerrar sesion','Salir','Cancelar')
      .then(res=>{
        if(res.isConfirmed){
          this._userService.logout();
          this.router.navigate(['/login'])
        }
      })
  }

  delete(userId: Number){
    confirmAlert('Estas seguro de eliminar?','Eliminar','Si','Cancelar')
      .then(res=>{
        if(res.isConfirmed){
          this._userService.deleteUser(userId.toString())
            .subscribe((res)=>{
              fireAlert('success',`( ${res.result.affectedRows} ) registro fueron eliminado(s)`,'Exito!')
            },error=>{
              console.log(error);
              fireAlert('error',error.message,'Ops!');
            })
        }
      })
  }

  constructor( private _userService: UserService, private router:Router) { }

  ngOnInit(): void {

    this.loadUsers();
  }

}
