import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { response, responseAction, User } from '../Interfaces/responseInterface';
//import { CookieService }  from "ngx-cookie";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token :string = '';
  httpOption = {
    headers : new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': ''
    })
  }

  constructor( private httpClient: HttpClient, 
    //private _cookieService : CookieService
    ) {
  }

  uri_base: string = 'http://localhost:3005/api';

  login(user:string, password:string): Observable<response>{
    return this.httpClient.post<response>(`${this.uri_base}/login`,
    {
      user,
      pass:password
    })
  }

  // inSession(token:string){
  //   this._cookieService.put('Authorization',token)
  // }

  setToken(token:string){
    localStorage.setItem('userId', token);
  }

  isLogin(){
    return new Promise<response>((res,rej)=>{
      console.log('token',this.token)
      let httpOption = {
        headers : new HttpHeaders({
          'Content-Type':'application/json',
          'Authorization': localStorage.getItem('userId') || ''
        })
      }
      this.httpClient.get<response>(`${this.uri_base}/authenticate`,httpOption)
      .subscribe((doc)=>res(doc),err=>rej(err));
      
  })
  }

  saveUser(user:User){
    let httpOption = {
      headers : new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': localStorage.getItem('userId') || ''
      })
    }
    if(user.id !== 0){
      return this.httpClient.put<responseAction>(`${this.uri_base}/users/${user.id}`,JSON.stringify(user),httpOption);
    }else{
      return this.httpClient.post<responseAction>(`${this.uri_base}/users`,JSON.stringify(user), httpOption);
    }
  }

  getUsers(): Observable<response>{
    let httpOption = {
      headers : new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': localStorage.getItem('userId') || ''
      })
    }
    return this.httpClient.get<response>(`${this.uri_base}/users`,httpOption);
  }

  logout(){
    localStorage.clear();
  }

  getUserId(userId: string): Observable<response>{
    let httpOption = {
      headers : new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': localStorage.getItem('userId') || ''
      })
    }
    return this.httpClient.get<response>(`${this.uri_base}/users/${userId}`,httpOption);
  }

  deleteUser(userId: string): Observable<responseAction>{
    const httpOption = {
      headers : new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': localStorage.getItem('userId') || ''
      })
    }

    return this.httpClient.get<responseAction>(`${this.uri_base}/deleteUser/${userId}`, httpOption);
  }

  

}
