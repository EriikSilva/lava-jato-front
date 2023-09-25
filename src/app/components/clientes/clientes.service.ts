import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getClients():Observable<any>{
    return this.http.get<any>(this.apiUrl + '/cliente')
  }

}
