import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.development';
import { Observable } from 'rxjs';
import { deleteClientCarDTO, postCarClientDTO } from './DTO/carrosDTO';

@Injectable({
  providedIn: 'root'
})
export class CarrosService {

  private readonly apiUrl = environment.apiUrl

  constructor(private http:HttpClient) { }

  postClientCar(body:postCarClientDTO):Observable<postCarClientDTO>{
    return this.http.post<postCarClientDTO>(`${this.apiUrl}/veiculo/cliente`, body)
  } 

  deleteClientCar(cd_tipo_veiculo: deleteClientCarDTO){
    const cd_tipo_veiculo_p = {
      body: cd_tipo_veiculo 
    };
    return this.http.delete(`${this.apiUrl}/veiculo/cliente`, cd_tipo_veiculo_p)
  }

  getCarByClient(cd_cliente:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/veiculo/cliente/${cd_cliente}`)
  }

  getTypeCar():Observable<any>{
    return this.http.get(`${this.apiUrl}/veiculo/tipo`)
  } 
}
