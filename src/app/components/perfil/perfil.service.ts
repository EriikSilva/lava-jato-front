import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
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

  uploadImageForUser(formData:FormData, nm_usuario:any) {
    return this.http.post(`${this.apiUrl}/upload/image?nm_usuario=${nm_usuario}`, { image: formData });
  }

  uploadImageForTable(formData:FormData, imageData:string){
    return this.http.post(`${this.apiUrl}/upload/image?descricao=${formData}`,  { image: imageData })
  }
}
