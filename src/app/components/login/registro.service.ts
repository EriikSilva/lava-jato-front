import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { UserRegisterDTO } from './DTO/userDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private readonly apiUrl = environment.apiUrl

  constructor(private http:HttpClient) { }

  registerUserService(user:UserRegisterDTO): Observable<UserRegisterDTO>{
    return this.http.post<UserRegisterDTO>(`${this.apiUrl}/usuario`, user)
  }
}
