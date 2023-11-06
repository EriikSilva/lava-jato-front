import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.development';
import { PostTipoPagamento, PutTipoPagamento } from '../../DTO/servicos.DTO';

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

  postTiposPagamento(body:PostTipoPagamento):Observable<PostTipoPagamento>{
    return this.http.post<PostTipoPagamento>(`${this.apiUrl}/financeiro/tipospagamentos`, body)
  }  

  putTiposPagamento(body:PutTipoPagamento):Observable<PutTipoPagamento>{
    return this.http.put<PutTipoPagamento>(`${this.apiUrl}/financeiro/tipospagamentos`, body)
  }
}
