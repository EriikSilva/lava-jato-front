import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  private readonly apiUrl = environment.apiUrl

  constructor(private http:HttpClient) { }
    
  getServicos():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/servicos`)
  }
}
