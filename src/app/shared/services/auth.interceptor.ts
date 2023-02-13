import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const accessTokenValue = localStorage.getItem("access_token");
        const refreshTokenValue = localStorage.getItem("refresh_token");
        
        if(accessTokenValue && refreshTokenValue) {
            if (this.authService.isLoggedOut()) {
                this.authService.refreshTokens(refreshTokenValue);
            }

            const cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + accessTokenValue)
            });

            return next.handle(cloned)
        
        } else {
            return next.handle(req);
        }
    }
    
}