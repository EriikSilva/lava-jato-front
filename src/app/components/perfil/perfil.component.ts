import { Component, OnInit } from '@angular/core';
import { PerfilService } from './perfil.service';
import { query } from '@angular/animations';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  constructor(private service: PerfilService, private http:HttpClient) {}
  isLoading: boolean = false;
  nm_usuario: any;
  image64: any;

  imgFrontend:any;

  selectedFile: any;

  ngOnInit(): void {
    this.nm_usuario = localStorage.getItem('nm_usuario');
    this.imgFront()
  }

  imgFront(){
    this.image64 = localStorage.getItem('image')
  }

  arrayBufferToBase64(buffer: number[]) {
    const binary = buffer.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, '');
    return btoa(binary);
  }


  inputFileChange(event:any){
    if(event.target.files && event.target.files[0]){
      const a = event.target.files[0]
      const fd = new FormData();
      fd.append('imagem', a)

      const nm_usuario = localStorage.getItem('nm_usuario')

      // this.service.uploadImageForUser(fd, nm_usuario)
      // .subscribe((res:any) => {
      //   const img = res.imgBase64.data
      //   const imgBase64 = this.arrayBufferToBase64(img);
      //   localStorage.setItem('image', imgBase64)
      //   console.log('res', res)
      // })
      
      this.http.post(`http://api.brnn-tech.com.br/upload/image?nm_usuario=${nm_usuario}`, fd)
      .subscribe((res:any) => {
        const img = res.imgBase64.data
        const imgBase64 = this.arrayBufferToBase64(img);
        localStorage.setItem('image', imgBase64)
      })
    }
  }

 
}
