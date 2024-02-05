import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
import { ClientEditDTO, ClientRegisterDTO, ClienteDeleteDTO, ClienteGetDTO } from './DTO/clientesDTO';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly apiUrl = environment.apiUrl

  constructor(private http: HttpClient, private title:Title) { }

   setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

  getClients():Observable<ClienteGetDTO>{
    return this.http.get<ClienteGetDTO>(`${this.apiUrl}/cliente`)
  }

  postClients(client:ClientRegisterDTO):Observable<ClientRegisterDTO>{
    return this.http.post<ClientRegisterDTO>(`${this.apiUrl}/cliente`, client)
  }

  editClient(cliente:ClientEditDTO):Observable<ClientEditDTO>{
    return this.http.put<ClientEditDTO>(`${this.apiUrl}/cliente`, cliente)
  }

  deleteClient(cd_cliente:ClienteDeleteDTO):Observable<ClienteDeleteDTO>{
    return this.http.delete<ClienteDeleteDTO>(`${this.apiUrl}/cliente/${cd_cliente}`)
  }
}
