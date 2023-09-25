import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = environment.apiUrl

  constructor() { }
}
