import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
import { UserLoginDTO, UserRegisterDTO  } from './DTO/userDTO';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token: string = ''
  private user:string = ''
  private cd_usuario = ""
  baseUrl = environment.apiUrl

  private readonly apiUrl = environment.apiUrl

  constructor(private http:HttpClient, private title:Title) { }

  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

  setCdUsuario(cd_usuario:any){
    this.cd_usuario = cd_usuario
    localStorage.setItem('cd_usuario', cd_usuario)
  }

  getCdUsuario(){
    return localStorage.getItem('cd_usuario')
  }

  removeCdUsuario(){
    return localStorage.removeItem('cd_usuario')
  }

  setUser(user:string){
    this.user = user
    localStorage.setItem('nm_usuario', user)
  }

  getUser(){
    return localStorage.getItem('nm_usuario')
  }

  removeUser(){
    return localStorage.removeItem('nm_usuario')
  }

  setToken(token:string){
    this.token = token
    localStorage.setItem('Authorization', token)
  }

  getToken(){
    return localStorage.getItem('Authorization')
  }
  
  removeToken(){
    return localStorage.removeItem('Authorization')
  }

  getImg(){
    return localStorage.getItem('image')
  }

  removeImg(){
    return localStorage.removeItem('image')
  }

  setImg(imgPath:string){
    return localStorage.setItem('image', imgPath)
  }

  userLogin(user:UserLoginDTO):Observable<UserLoginDTO>{
    return this.http.post<UserLoginDTO>(`${this.apiUrl}/login`, user)
  }

  registerUser(user:UserRegisterDTO): Observable<UserRegisterDTO>{
    return this.http.post<UserRegisterDTO>(`${this.apiUrl}/usuario`, user)
  }
}
