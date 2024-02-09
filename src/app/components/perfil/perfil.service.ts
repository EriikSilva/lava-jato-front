import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
// import { environment } from 'environments/environment.pr';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private readonly apiUrl = environment.apiUrl

  constructor(private http:HttpClient) { }

  getImage(){
    return this.http.get(`${this.apiUrl}/upload/image?param=testeLogo2`);
  }
}
