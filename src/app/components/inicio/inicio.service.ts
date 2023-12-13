import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor( private title:Title) { }

  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
}
