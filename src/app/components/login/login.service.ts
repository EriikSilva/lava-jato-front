import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';
import { UserLoginDTO  } from './DTO/userDTO';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token: string = ''
  baseUrl = environment.apiUrl

  private readonly apiUrl = environment.apiUrl

  constructor(private http:HttpClient) { }

  setToken(token:string){
    this.token = token
    localStorage.setItem('jwt', token)
  }

  getToken(){
    return localStorage.getItem('jwt')
  }
  
  removeToken(){
    return localStorage.removeItem('jwt')
  }


  userLogin(user:UserLoginDTO):Observable<UserLoginDTO>{
    return this.http.post<UserLoginDTO>(this.apiUrl + "/login", user)
  }


}
