import { Component, OnInit, ViewChild } from '@angular/core';
import { PerfilService } from './perfil.service';
import { query } from '@angular/animations';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [MessageService]
})
export class PerfilComponent implements OnInit {
  constructor(private messageService: MessageService, private loginService:LoginService, private http:HttpClient) {}
  isLoading: boolean = false;
  nm_usuario: any;
  image64: any;
  imgUserPostRequest:any
  selectedImage: string | ArrayBuffer | null = null;

  imgFrontend:any;

  selectedFile: any;
  @ViewChild('fileInput') fileInput: any;

  ngOnInit(): void {
    this.nm_usuario = localStorage.getItem('nm_usuario');
    this.imgFront()
  }

  async imgFront(){
    const image = await localStorage.getItem('image')
    
    if(image?.startsWith('src')){
      this.image64 = 'assets/project-img/profile_icon3.png'
    }else{
      this.image64 = 'data:image/png;base64,' + image
    }
  }

  arrayBufferToBase64(buffer: number[]) {
    const binary = buffer.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, '');
    return btoa(binary);
  }


  async inputFileChange(event:any){
    if(event.target.files && event.target.files[0]){
      const a = event.target.files[0]
      const fd = new FormData();
      fd.append('imagem', a)

      // const reader = new FileReader();
      // reader.onload = () => {
      //   this.selectedImage = reader.result;
      // };
      // reader.readAsDataURL(a);
      // return
      const nm_usuario = localStorage.getItem('nm_usuario')

      // this.service.uploadImageForUser(fd, nm_usuario)
      // .subscribe((res:any) => {
      //   const img = res.imgBase64.data
      //   const imgBase64 = this.arrayBufferToBase64(img);
      //   localStorage.setItem('image', imgBase64)
      //   console.log('res', res)
      // })
      
      await this.http.post(`http://api.brnn-tech.com.br/upload/image?nm_usuario=${nm_usuario}`, fd)
      .subscribe({
        next:(res:any) => {
            const img = res.imgBase64.data
     
          const imgBase64 = this.arrayBufferToBase64(img);
          this.image64 = imgBase64
          setTimeout(() => {
            this.loginService.setImg(imgBase64)
            window.location.reload()
          }, 1000)
        },error:(err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: err,
          });
        }
      })
    }


  }

  triggerInputClick() {
    this.fileInput.nativeElement.click();
  }

 
}
