import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginDTO, UserRegisterDTO } from './DTO/userDTO';
import { RegistroService } from './registro.service';
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

  constructor(
    private router: Router,
    private registroService: RegistroService,
    private loginService: LoginService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    localStorage.removeItem("Authorization")
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

  doLogin() {
    this.buttonLoading = true;

    const formValue = this.userFormLogin.value;

    const email = formValue.email || '';
    const senha = formValue.senha || '';

    const bodyLogin: UserLoginDTO = {
      email,
      senha,
    };

    this.loginService.userLogin(bodyLogin).subscribe({
      next: (res: any) => {
        const { token, user } = res;
        this.buttonLoading = false
        
        this.loginService.setToken(token)
        this.loginService.setUser(user)
        if(token)
        this.router.navigate(['/dashboard']);
      },
      error: (res: any) => {
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

    this.registroService.registerUserService(bodyRegistro).subscribe({
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
        const { error } = res.error
        this.buttonLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: error,
        });
      },
    });
  }

  ngAfterViewInit(): void {
      this.buttonLoading = false
  }

}
