import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {
  private readonly apiUrl = environment.apiUrl

  constructor(
    private http:HttpClient
  ) { }

  getListaMovimetacoes(){
    return this.http.get(`${this.apiUrl}/financeiro/listarMovimentacoes`)
  }

  getListaTransacoes(){
    return this.http.get(`${this.apiUrl}/financeiro/listarTransacoes`)
  }

}
