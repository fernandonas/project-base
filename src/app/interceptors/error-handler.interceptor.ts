import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, catchError, throwError, timeout } from "rxjs";
import { AuthService } from "../login/services/auth.service";

export const errorHandlerInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const authService = inject(AuthService);
  
    return next(req).pipe(
      timeout(10000),
      catchError((httpResponse: HttpErrorResponse) => {
        if (httpResponse.status === 401) {
          authService.logout();
        }
        return throwError(() => httpResponse);
      })
    );
  };