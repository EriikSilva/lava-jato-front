import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'environments/environment.prod';
import { UserLoginDTO } from './DTO/userDTO';

describe('LoginService', () => {
  let service: LoginService;
  let http: HttpClient


  const apiUrl = environment.apiUrl

  it('Chamar Post', () => {
    const dummyDataLogin:UserLoginDTO = {
      email: 'erik@teste.com',
      senha: '123'
    }
    const spy = spyOn(http, 'post').and.callThrough();
    service.userLogin(dummyDataLogin)
    expect(spy).toHaveBeenCalledWith(`${apiUrl}/login`, dummyDataLogin);
  })


  it('deve remover o token do Local Storage', () => {
    localStorage.setItem('Authorization', 'meu-token-de-teste');
    service.removeToken();
    expect(localStorage.getItem('Authorization')).toBeNull();
  });

  it('deve retornar null se tentar remover um token inexistente', () => {
    service.removeToken();
    expect(localStorage.getItem('Authorization')).toBeNull();
  });

  it('deve definir o token no Local Storage', () => {
    const token = 'meu-token-de-teste';
    service.setToken(token);
    expect(localStorage.getItem('Authorization')).toBe(token);
  });


  it('deve atualizar o token no Local Storage', () => {
    const token1 = 'token-1';
    const token2 = 'token-2';

    service.setToken(token1);
    expect(localStorage.getItem('Authorization')).toBe(token1);
    service.setToken(token2);
    expect(localStorage.getItem('Authorization')).toBe(token2);
  });

  it('deve definir o usuário no Local Storage', () => {
    const user = 'meu-usuario-de-teste';
    service.setUser(user);
    expect(localStorage.getItem('nm_usuario')).toBe(user);
  });

  it('deve atualizar o usuário no Local Storage', () => {
    const user1 = 'usuario-1';
    const user2 = 'usuario-2';

    service.setUser(user1);
    expect(localStorage.getItem('nm_usuario')).toBe(user1);
    service.setUser(user2);
    expect(localStorage.getItem('nm_usuario')).toBe(user2);
  });

  it('deve obter o token do Local Storage', () => {
    localStorage.setItem('Authorization', 'meu-token-de-teste');

    const token = service.getToken();

    expect(token).toBe('meu-token-de-teste');
  });

  it('deve retornar null se o token não estiver no Local Storage', () => {
    const token = service.getToken();
    expect(token).toBeNull();
  });


  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LoginService);
    http    = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    localStorage.removeItem('nm_usuario');
    localStorage.removeItem('Authorization');
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
