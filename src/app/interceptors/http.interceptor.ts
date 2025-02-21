import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../login/services/auth.service";


export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const authService = inject(AuthService);
  
    if (!authService.isAuthenticated()) {
      return next(req);
    }
  
    return next(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${authService.user?.token}`
        }
      })
    );
  };
  