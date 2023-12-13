import { Component, OnInit } from '@angular/core';
import { InicioService } from './inicio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit{

  constructor(private inicioService:InicioService){}

  ngOnInit(): void {
    const nome = this.toCapitalCase(localStorage.getItem("nm_usuario"))
    this.inicioService.setTitle(`Bem Vindo - ${nome}` ) 
  }

  toCapitalCase(str:any) {
    if (!str) {
      return '';
    }
  
    return str
      .split(' ')
      .map((word:any) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

}
