import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
userName: string = '';
password: string = '';

message: string = '';

  constructor( private _userService: UserService, private _router: Router) { }

  ingresar(){
    this._userService.login(this.userName,this.password)
      .subscribe(res=>{
        console.log(res);
        this._userService.setToken(res.token);
        this._router.navigate(['/']);
      },({error})=>{
        console.log(error);
        this.message = error.message;
      })
  }

  cambio(){
    this.message = '';
  }

  ngOnInit(): void {
  }

}
