import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
import { AgendamentosDTO, AtendimentoDTO, FinalizarServicoDTO, ServicosFinalizadosDTO } from './DTO/atendimentoDTO';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {
  
  private readonly apiUrl = environment.apiUrl

  constructor(
    private http:HttpClient,
    private title:Title
  ) { }
  
  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
  
  getAtendimentosAgendamentos():Observable<AtendimentoDTO>{
    return this.http.get<AtendimentoDTO>(`${this.apiUrl}/atendimentos/agendamento/`)
  }
  getAtendimentosAgendamento(cd_cliente:string):Observable<AtendimentoDTO>{
    return this.http.get<AtendimentoDTO>(`${this.apiUrl}/atendimentos/agendamento/${cd_cliente}`)
  }

  getServicosEmAndamento(nr_atendimento:number): Observable<any>{
    return this.http.get(`${this.apiUrl}/atendimentos/servicosAndamento/${nr_atendimento}`)
  }

  gerarAtendimento(body:AgendamentosDTO):Observable<AgendamentosDTO>{
    return this.http.post<AgendamentosDTO>(`${this.apiUrl}/atendimentos/agendamento`, body)
  }

  servicosFinalizados():Observable<ServicosFinalizadosDTO>{
    return this.http.get<ServicosFinalizadosDTO>(`${this.apiUrl}/atendimentos/servicosFinalizados`)
  }

  finalizarServico(body:FinalizarServicoDTO):Observable<FinalizarServicoDTO>{
    return this.http.post<FinalizarServicoDTO>(`${this.apiUrl}/atendimentos/finalizarServico`, body)
  }

  finalizarAtendimento(nr_atendimento:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/atendimentos/finalizarAtendimento/${nr_atendimento}`, [])
  }

  postPagamento(body:any){
    return this.http.post(`${this.apiUrl}/financeiro/pagamento`, body)
  }

  cancelarAtendimento(nr_atendimento_p:number,cd_usuario_p:number):Observable<any>{
    return this.http.post(`${this.apiUrl}/atendimentos/cancelar/${nr_atendimento_p}/${cd_usuario_p}`,[])
  }
}
