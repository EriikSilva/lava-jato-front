import { Component, OnInit } from '@angular/core';
import { PerfilService } from './perfil.service';
import { query } from '@angular/animations';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  constructor(private service: PerfilService) {}
  isLoading: boolean = false;
  nm_usuario: any;
  image64: any;

  ngOnInit(): void {
    this.nm_usuario = localStorage.getItem('nm_usuario');
    this.getImage();
  }
  getImage() {
    this.service.getImage().subscribe({
      next: (res: any) => {
        const { data } = res.base[0].base;
        this.image64 = this.arrayBufferToBase64(data);
      },
      error: (res) => {
        console.log(res);
        console.log('caiu no error');
      },
    });
  }
  arrayBufferToBase64(buffer: number[]) {
    const binary = buffer.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, '');
    return btoa(binary);
  }
}
