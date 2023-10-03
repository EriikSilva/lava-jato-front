import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../components/login/login.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.loginService.getToken();
    const nm_usuario = this.loginService.getUser() || ""
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token,
          nm_usuario:nm_usuario
        },
      });
    }
    return next.handle(request);
  }

}