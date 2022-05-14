import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Interfaces/responseInterface';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userId:string = ''
  user : User = {} as User;
  constructor( private _userService: UserService, private route:ActivatedRoute ) { }


  ngOnInit(): void {

    this.userId = this.route.snapshot.paramMap.get('userId') || '';
    console.log(this.userId);

    this._userService.getUserId(this.userId)
      .subscribe(res=>{
        console.log(res);
        this.user = res.result[0];
        console.log(this.user);
      })

    

  }

}
