import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { environment } from 'environments/environment.pr';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  // private readonly apiUrl = environment.apiUrl

  constructor(private http:HttpClient) { }

  uploadImage(body:any){
    // return this.http.post(`${this.apiUrl}/upload/image`, body)
  }
}
