import { AfterViewInit, Component, OnInit, ElementRef} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginDTO, UserRegisterDTO } from './DTO/userDTO';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent  implements OnInit, AfterViewInit{
  messages: Message[] = [];
  buttonLoading: boolean = false;
  imgUser:any

  constructor(
    private router: Router,
    private loginService: LoginService,
    private messageService: MessageService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.loginService.setTitle("Login - Lava Jato");
    localStorage.removeItem("Authorization");
  }

  userFormRegister = new FormGroup({
    nm_usuario: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required),
  });

  userFormLogin = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl(''),
  });

  arrayBufferToBase64(buffer: number[]) {
    const binary = buffer.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, '');
    return btoa(binary);
  }

  doLogin() {
    this.buttonLoading = true;

    const formValue = this.userFormLogin.value;

    const email = formValue.email || '';
    const senha = formValue.senha || '';

    const bodyLogin: UserLoginDTO = {
      email,
      senha,
    };

    this.loginService.userLogin(bodyLogin)
    .subscribe({
      next: (res: any) => {
        const { token, user, cd_usuario, imagem } = res;
        this.buttonLoading = false

     

        this.loginService.setToken(token)
        this.loginService.setUser(user)
        this.loginService.setCdUsuario(cd_usuario)
        if(token)
        this.router.navigate(['/inicio']);

        if(!imagem){
          this.imgUser = "src/assets/project-img/profile_icon3.png"
        }else {
          this.imgUser = this.arrayBufferToBase64(imagem.data);
        }
        
        this.loginService.setImg(this.imgUser)
      },
      error: (res: any) => {
        const senhaControl = this.userFormLogin.get('senha');
        if (senhaControl) {
          senhaControl.reset();
        }
        this.buttonLoading = false
        const { error } = res.error
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: error,
        });
      },
    });
  }
  registerUser() {
    this.buttonLoading = true;
    if (this.userFormRegister.invalid) {
      this.buttonLoading = false;
      this.messageService.add({
        severity: 'warn',
        summary: 'Validação',
        detail: "Preencha os Campos Obrigatórios",
      });
      return;
    }

    const formValue = this.userFormRegister.value;

    const nm_usuario = formValue.nm_usuario || '';
    const email = formValue.email || '';
    const senha = formValue.senha || '';

    const bodyRegistro: UserRegisterDTO = {
      nm_usuario,
      email,
      senha,
    };

    this.loginService.registerUser(bodyRegistro).subscribe({
      next: (res: any) => {
        const { message } = res
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: message,
        })
        this.buttonLoading = false;
        this.userFormRegister.reset();
      },
      error: (res: any) => {
        const { message } = res.error
        this.buttonLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: message,
        });
      },
    });
  }

  onTabChange(event:any){
    if(event.index == 1){
      this.userFormRegister.reset();
    }
  }


  setFocus(fieldName: string): void {
    const inputElement = this.elementRef.nativeElement.querySelector(`[formcontrolname="${fieldName}"]`);
    if (inputElement) {
      inputElement.focus();
    }
  }

  ngAfterViewInit(): void {
      this.buttonLoading = false;
      this.setFocus('email')
  }

}
