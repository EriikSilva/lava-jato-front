import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegisterDTO } from './DTO/userDTO';
import { RegistroService } from './registro.service';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {
  messages: Message[] = [];

  constructor(
    private router: Router,
    private registroService: RegistroService,
    private messageService:MessageService
  ) {}

  userFormRegister = new FormGroup({
    nm_usuario: new FormControl(''),
    email: new FormControl(''),
    senha: new FormControl(''),
  });

  doLogin() {
    this.router.navigate(['/dashboard']);
  }
  registerUser() {
    if (this.userFormRegister.invalid) {
      this.messages = [
        { severity: 'warn', summary: 'Preencha os campos obrigatórios'},
      ];
      return;
    }

    const formValue = this.userFormRegister.value;

    const nm_usuario = formValue.nm_usuario || '';
    const email = formValue.email || '';
    const senha = formValue.senha || '';

    const bodyLogin: UserRegisterDTO = {
      nm_usuario,
      email,
      senha,
    };

    this.registroService.registerUserService(bodyLogin)
    .subscribe({
      next: (res: any) => {
        this.messages = [
          { severity: 'success', summary: 'Successo', detail: res.message },
        ];
        this.userFormRegister.reset();
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.data.message });
      },
    });
  }
}
