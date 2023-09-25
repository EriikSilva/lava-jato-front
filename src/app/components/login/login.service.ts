import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';
import { UserLoginDTO  } from './DTO/userDTO';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = environment.apiUrl

  constructor(private http:HttpClient) { }

  userLogin(user:UserLoginDTO):Observable<UserLoginDTO>{
    return this.http.post<UserLoginDTO>(this.apiUrl + "/login", user)
  }


}
