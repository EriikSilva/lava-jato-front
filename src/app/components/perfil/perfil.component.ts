import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit{

    isLoading: boolean = false
    nm_usuario: any

    ngOnInit(): void {
      this.nm_usuario = localStorage.getItem("nm_usuario")
    }

}
