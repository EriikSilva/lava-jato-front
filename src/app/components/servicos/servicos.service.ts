import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {
  
  private readonly apiUrl = environment.apiUrl

  constructor(
    private http:HttpClient
  ) { }
    

  atendimentosAgendamento(cd_cliente:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/atendimentos/agendamento/${cd_cliente}`)
  }

}
