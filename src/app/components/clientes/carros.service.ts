import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.development';
import { VeiculosCliente } from './DTO/clientesDTO';
import { Observable } from 'rxjs';
import { postCarClientDTO } from './DTO/carrosDTO';

@Injectable({
  providedIn: 'root'
})
export class CarrosService {

  private readonly apiUrl = environment.apiUrl

  constructor(private http:HttpClient) { }

  // postCar(veiculos_clientes: VeiculosCliente):Observable<VeiculosCliente>{
  //   return this.http.post<VeiculosCliente>(`${this.apiUrl}/veiculo/cliente`, veiculos_clientes);
  // }

  postClientCar(body:postCarClientDTO):Observable<postCarClientDTO>{
    return this.http.post<postCarClientDTO>(`${this.apiUrl}/veiculo/cliente`, body)
  }

  getTypeCar():Observable<any>{
    return this.http.get(`${this.apiUrl}/veiculo/tipo`)
  }
}
