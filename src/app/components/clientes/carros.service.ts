import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.development';
import { VeiculosCliente } from './DTO/clientesDTO';
import { Observable } from 'rxjs';
import { deleteClientCarDTO, postCarClientDTO } from './DTO/carrosDTO';

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

  deleteClientCar(cd_tipo_veiculo: deleteClientCarDTO){
    const cd_tipo_veiculo_p = {
      body: cd_tipo_veiculo 
    };
    return this.http.delete(`${this.apiUrl}/veiculo/cliente`, cd_tipo_veiculo_p)
  }

  getTypeCar():Observable<any>{
    return this.http.get(`${this.apiUrl}/veiculo/tipo`)
  }
}
