import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError, timeout } from "rxjs";
import { AuthService } from "../login/services/auth.service";

@Injectable({ providedIn: 'root' })
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(
        private readonly authService: AuthService
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            timeout(10000),
            catchError((httpResponse: HttpErrorResponse) => {
                if (httpResponse.status == 401) {
                    this.authService.logout();
                }
                return throwError(() => httpResponse)
            })
        )
    }

}