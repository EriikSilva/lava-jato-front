import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class GestaoService {

  private readonly apiUrl = environment.apiUrl
}
