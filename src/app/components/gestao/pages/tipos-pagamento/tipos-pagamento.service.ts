import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TiposPagamentoService {

  private readonly apiUrl = environment.apiUrl

  constructor(
    private http:HttpClient
  ) { }

    
  getTiposPagamento(){
   return this.http.get(`${this.apiUrl}/financeiro/tipospagamentos`) 
  }



}
