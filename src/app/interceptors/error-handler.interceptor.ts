import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, catchError, throwError, timeout } from "rxjs";
import { AuthService } from "../modules/login/services/auth.service";
import { NzNotificationService } from "ng-zorro-antd/notification";

export const errorHandlerInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const authService = inject(AuthService);
    const nzNotificationService = inject(NzNotificationService);
  
    return next(req).pipe(
      timeout(10000),
      catchError((httpResponse: HttpErrorResponse) => {
        if (httpResponse.status === 401) {
          authService.logout();
        }
        if(httpResponse.status === 404){
          return throwError(() => httpResponse);
        }
        nzNotificationService.warning(httpResponse.error, '')
        return throwError(() => httpResponse);
      })
    );
  };