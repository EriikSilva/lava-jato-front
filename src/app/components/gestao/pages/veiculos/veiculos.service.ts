import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';
import { DeleteVeiculo, PostVeiculo, PutVeiculo } from '../../DTO/servicos.DTO';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {

  private readonly apiUrl = environment.apiUrl

  constructor(private http:HttpClient) { }


  getVeiculos(){
    return this.http.get(`${this.apiUrl}/veiculo/tipo`)
  }

  postVeiculos(body:PostVeiculo):Observable<PostVeiculo>{
    return this.http.post<PostVeiculo>(`${this.apiUrl}/veiculo/tipo`, body)
  }

  putVeiculo(body:PutVeiculo):Observable<PutVeiculo>{
    return this.http.put<PutVeiculo>(`${this.apiUrl}/veiculo/tipo`, body)
  }

  deleteVeiculo(cd_tipo_veiculo:DeleteVeiculo):Observable<DeleteVeiculo>{
    return this.http.delete<DeleteVeiculo>(`${this.apiUrl}/veiculo/tipo/${cd_tipo_veiculo}`)
  }

}
