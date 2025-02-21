import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../login/services/auth.service";

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private readonly authService: AuthService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(!this.authService.isAuthenticated()){
           return next.handle(req);
        }
        return next.handle(req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.authService.user?.token}`
            }
        }))
    }

}