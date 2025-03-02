import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
constructor() { }

private readonly httpClient=inject(HttpClient);
private readonly router=inject(Router);


  userData:any=null

  sendRegisterForm(data:object):Observable<any>{
  return  this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',data);
  }

  sendLoginForm(data:object):Observable<any>{
  return  this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',data);
  }

  
  saveUserData(){
    if(localStorage.getItem('userToken')!==null){
    this.userData =  jwtDecode(localStorage.getItem('userToken')!)
    }; 
  }

  logOut():void{
    localStorage.removeItem('userToken');
    this.userData=null;
    this.router.navigate(['/login']);
  }

setEmailVerify(data:object):Observable<any>{
  return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,data)
}
setCodeVerify(data:object):Observable<any>{
  return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,data)
}
setResetPass(data:object):Observable<any>{
  return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,data)
}

}