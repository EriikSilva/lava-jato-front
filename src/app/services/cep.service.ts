import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  getEnderecoByCep(cep: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cliente/buscarCep/${cep}`)
  }
}
