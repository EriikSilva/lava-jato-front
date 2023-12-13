import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {
  private readonly apiUrl = environment.apiUrl

  constructor(
    private http:HttpClient,
    private title:Title
  ) { }

  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

  getListaMovimetacoes(){
    return this.http.get(`${this.apiUrl}/financeiro/listarMovimentacoes`)
  }

  getListaTransacoes(nr_atendimento:number, seq_financeiro:number){
    return this.http.get(`${this.apiUrl}/financeiro/listarTransacoes?nr_atendimento=${nr_atendimento}&nr_seq_financeiro=${seq_financeiro}&tipo=`)
  }

}
