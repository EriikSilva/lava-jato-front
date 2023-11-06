import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';
import { PostServico, PutServico } from './DTO/servicos.DTO';

@Injectable({
  providedIn: 'root'
})
export class GestaoService {

  private readonly apiUrl = environment.apiUrl
}
