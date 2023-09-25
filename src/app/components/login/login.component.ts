import { Component } from '@angular/core';
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
export class LoginComponent {
  messages: Message[] = [];

  constructor(
    private router: Router,
    private registroService: RegistroService,
    private loginService: LoginService,
    private messageService: MessageService
  ) {}

  userFormRegister = new FormGroup({
    nm_usuario: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
  });

  userFormLogin = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl(''),
  });

  doLogin() {
    const formValue = this.userFormLogin.value;

    const email = formValue.email || '';
    const senha = formValue.senha || '';

    const bodyLogin: UserLoginDTO = {
      email,
      senha,
    };

    this.loginService.userLogin(bodyLogin).subscribe({
      next: (res: any) => {
        const token = res.data.token;
        this.loginService.setToken(token)
        if(token)
        this.router.navigate(['/dashboard']);
      },
      error: (res: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: res.error.data.error,
        });
      },
    });
  }
  registerUser() {
    if (this.userFormRegister.invalid) {
      this.messages = [
        { severity: 'warn', summary: 'Preencha os campos obrigatórios' },
      ];
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
        this.messages = [
          { severity: 'success', summary: 'Successo', detail: res.message },
        ];
        this.userFormRegister.reset();
      },
      error: (res: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: res.error.data.message,
        });
      },
    });
  }
}
