import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, catchError, throwError, timeout } from "rxjs";
import { AuthService } from "../modules/login/services/auth.service";

export const errorHandlerInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const authService = inject(AuthService);
  
    return next(req).pipe(
      timeout(10000),
      catchError((httpResponse: HttpErrorResponse) => {
        if (httpResponse.status === 401) {
          alert('Login expirado faça login novamente por favor!');
          authService.logout();
        }
        alert(httpResponse.error.detailedMessage);
        return throwError(() => httpResponse);
      })
    );
  };