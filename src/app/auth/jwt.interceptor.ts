import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { map, Observable, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.addJwtToken(request)).pipe(
      catchError((requestError) => {
        if (requestError.status == 401) {
          this.auth.logoutUser();
          return throwError(() => new Error('unauthorized'));
        }
        return throwError(() => new Error(requestError));
      })
    ) as Observable<HttpEvent<any>>;
  }

  addJwtToken(request: HttpRequest<any>) {
    const token = this.auth.getJWT();

    return request.clone({
      setHeaders: {
        Authorization: `${token}`,
      },
    });
  }
}
