import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';
import { PostServico, PutServico } from './DTO/servicos.DTO';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  private readonly apiUrl = environment.apiUrl

  constructor(private http:HttpClient) { }
    
  getServicos():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/servicos`)
  }
    
  postServicos(desc_servico:string, vlr_servico:number):Observable<PostServico>{
    const body:PostServico = {
      desc_servico,
      vlr_servico
    }
    return this.http.post<PostServico>(`${this.apiUrl}/servicos`,body)
  }  

  editServico(body:PutServico):Observable<PutServico>{
    return this.http.put<PutServico>(`${this.apiUrl}/servicos`, body)
  }
  
  deleteServico(cd_servico:number){
    return this.http.delete(`${this.apiUrl}/servicos/${cd_servico}`)
  }


  finalizarServico(nr_atendimento_p:number,nr_servico_p:number):Observable<any>{
    const bodyFinalizarServico = {
      nr_atendimento_p,
      nr_servico_p
    }
    return this.http.post<any>(`${this.apiUrl}/atendimentos/finalizarServico`,bodyFinalizarServico )
  }
}
