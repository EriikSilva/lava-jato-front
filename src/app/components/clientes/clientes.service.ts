import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';
import { ClientRegisterDTO, ClienteDeleteDTO, ClienteEditDTO, ClienteGetDTO } from './DTO/clientesDTO';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getClients():Observable<ClienteGetDTO>{
    return this.http.get<ClienteGetDTO>(`${this.apiUrl}/cliente`)
  }

  postClients(client:ClientRegisterDTO):Observable<ClientRegisterDTO>{
    return this.http.post<ClientRegisterDTO>(`${this.apiUrl}/cliente`, client)
  }

  editClient(cliente:ClienteEditDTO):Observable<ClienteEditDTO>{
    return this.http.put<ClienteEditDTO>(`${this.apiUrl}/cliente`, cliente)
  }

  deleteClient(cd_cliente:ClienteDeleteDTO):Observable<ClienteDeleteDTO>{
    return this.http.delete<ClienteDeleteDTO>(`${this.apiUrl}/cliente/${cd_cliente}`)
  }
}
