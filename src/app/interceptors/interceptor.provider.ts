import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandlerInterceptor } from "./error-handler.interceptor";
import { AuthInterceptor } from "./http.interceptor";

export const interceptorProvider = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true}
]