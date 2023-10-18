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

  finalizarServico(nr_atendimento_p:number,nr_servico_p:number):Observable<any>{
    const bodyFinalizarServico = {
      nr_atendimento_p,
      nr_servico_p
    }
    return this.http.post<any>(`${this.apiUrl}/atendimentos/finalizarServico`,bodyFinalizarServico )
  }
}
