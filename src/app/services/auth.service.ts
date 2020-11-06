import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { ApiSettigns } from 'src/app/API/API.settings';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user_token = '';
  type_token = '';
  profile = '';

  constructor(private http:HttpClient) {
    this.leerToken();
   }

  signup(user:UserModel){
    const data = {
      user_name:user.user_name,
      user_email:user.user_email,
      user_password:user.user_password,
      user_password_confirmation:user.user_password_confirmation
    };
    const headers = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    };
    return this.http.post(`${ApiSettigns.url}auth/signupCliente`,data,{ headers });
  }

  login(user:UserModel){
 
    const auth = {
      user_email:user.user_email,
      user_password:user.user_password, 
      remember_me:true
    }

    console.log(auth);
    const headers = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }

    return this.http.post(`${ApiSettigns.url}auth/login`,auth,{ headers });
  }

  logout(){
    
    const headers = {
      "Authorization":`${this.type_token} ${this.user_token}`
    }
    return this.http.get(`${ApiSettigns.url}auth/logout`,{ headers });
  }

  guardarToken(token:string, type_token:string, expira:string, profile:string){
    /*guarda los datos de sesión en el localstorage del browser*/
    this.user_token = token;
    this.type_token = type_token;
    localStorage.setItem('token',this.user_token);
    localStorage.setItem('type_token',this.type_token);
    localStorage.setItem('expira',expira);
    localStorage.setItem('profile',profile);
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.user_token = localStorage.getItem('token');
      this.type_token = localStorage.getItem('type_token');
      this.profile = localStorage.getItem('profile');
    }else{
      this.user_token = '';
      this.type_token = '';
      this.profile = '';
    }
  }

  isAuth():boolean{
    if(this.user_token.length < 2){
      return false;
    }else{
      var expira = new Date(localStorage.getItem('expira')).getTime();
      var date_expira = new Date();
      date_expira.setTime(expira);
      if (date_expira > new Date()){
        return true;
      }else{
        return false;
      }
    }
  }

  user(){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${this.type_token} ${this.user_token}`
    }
      return this.http.get(`${ApiSettigns.url}auth/user`,{ headers });

  }
}
