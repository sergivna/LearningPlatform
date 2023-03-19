import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/http/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      
      console.log("interceptor");
      
      const cloneRequest = req.clone({
        headers: req.headers.append(
          'Authorization',
          `Bearer ${this.authService.getToken()}`
        ),
      });

      return next.handle(cloneRequest);
  }
}
