import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fireAlert } from 'src/app/Helpers/alert';
import { User } from 'src/app/Interfaces/responseInterface';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userId : string= '';
  user: User = {} as User;

  perfiles : string[] = [
    'usuario','admin'
  ]

  constructor( private _userSevice: UserService, private router: ActivatedRoute) { }

  guardar(){
    this._userSevice.saveUser(this.user)
      .subscribe(res=>{
        fireAlert('success',`Se guardo la informacion de ${res.result.affectedRows} resgistro(s)`,'Hecho!');
        this.user = {} as User;
      },err=>{
        console.log('Error',err)
      })
  }

  ngOnInit(): void {
    this.userId = this.router.snapshot.paramMap.get('userId') || '';
    if(this.userId !== ''){
      this._userSevice.getUserId(this.userId)
        .subscribe(res=>{this.user = res.result[0]
          this.user.password == '';
        });
    }else{
      this.user.id = 0;
    }
  }

}
