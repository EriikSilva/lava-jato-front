import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';
import { AgendamentosDTO, FinalizarServicoDTO } from './DTO/atendimentoDTO';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {
  
  private readonly apiUrl = environment.apiUrl

  constructor(
    private http:HttpClient
  ) { }
  
  getAtendimentosAgendamentos():Observable<any>{
    return this.http.get(`${this.apiUrl}/atendimentos/agendamento/`)
  }
  getAtendimentosAgendamento(cd_cliente:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/atendimentos/agendamento/${cd_cliente}`)
  }

  gerarAtendimento(body:AgendamentosDTO):Observable<AgendamentosDTO>{
    return this.http.post<AgendamentosDTO>(`${this.apiUrl}/atendimentos/agendamento`, body)
  }

  servicosFinalizados():Observable<any>{
    return this.http.get(`${this.apiUrl}/atendimentos/servicosFinalizados`)
  }

  finalizarServico(body:FinalizarServicoDTO):Observable<FinalizarServicoDTO>{
    return this.http.post<FinalizarServicoDTO>(`${this.apiUrl}/atendimentos/finalizarServico`, body)
  }

  finalizarAtendimento(nr_atendimento:any,nr_servico:any):Observable<any>{
    const body = {
      nr_atendimento_p: nr_atendimento,
      nr_servico_p:nr_servico
    }
    return this.http.post(`${this.apiUrl}/atendimentos/finalizarAtendimento/${nr_atendimento}`, body)
  }

}
