import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class GestaoService {

  constructor(private title:Title){}
  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

  private readonly apiUrl = environment.apiUrl
}
