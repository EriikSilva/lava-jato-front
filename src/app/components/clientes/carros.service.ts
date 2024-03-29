import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Observable, } from 'rxjs';
import { editClientCarDTO, deleteClientCarDTO, postCarClientDTO, getCarByClientDTO } from './DTO/carrosDTO';

@Injectable({
  providedIn: 'root'
})
export class CarrosService {

  private readonly apiUrl = environment.apiUrl

  constructor(private http:HttpClient) { }

  postClientCar(body:postCarClientDTO):Observable<postCarClientDTO>{
    return this.http.post<postCarClientDTO>(`${this.apiUrl}/veiculo/cliente`, body)
  } 

  editClientCar(body:editClientCarDTO): Observable<editClientCarDTO>{
    return this.http.put<editClientCarDTO>(`${this.apiUrl}/veiculo/cliente`, body)
  }

  deleteClientCar(cd_tipo_veiculo: deleteClientCarDTO){
    return this.http.delete(`${this.apiUrl}/veiculo/cliente/${cd_tipo_veiculo}`)
  }

  getVeiculoCliente(cd_cliente:any):Observable<any>{
    return this.http.get(`${this.apiUrl}/veiculo/cliente/${cd_cliente}`)
  }


  getCarByClient(cd_cliente:getCarByClientDTO):Observable<getCarByClientDTO>{
    return this.http.get<getCarByClientDTO>(`${this.apiUrl}/veiculo/cliente/${cd_cliente}`)
  }

  getTypeCar():Observable<any>{
    return this.http.get(`${this.apiUrl}/veiculo/tipo`)
  } 
}
