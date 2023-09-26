import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';
import { ClientRegisterDTO } from './DTO/clientesDTO';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getClients():Observable<any>{
    return this.http.get<any>(this.apiUrl + '/cliente')
  }

  postClients(client:ClientRegisterDTO):Observable<ClientRegisterDTO>{
    return this.http.post<ClientRegisterDTO>(this.apiUrl + '/cliente', client)
  }
}
