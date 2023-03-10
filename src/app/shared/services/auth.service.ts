import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, shareReplay, tap, throwError } from "rxjs";

import * as moment from "moment";

import { SimpleUser, User } from "../models/user.model";
import { TokenResponse } from "../models/auth-response.model";

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {}

    createAccount(user: SimpleUser) {
        return this.http.post<User>("api/users/save", user);
    }
    
    login(email: string, password: string) {
        const httpOptions: object = {
            headers: new HttpHeaders({
                'content-type': 'application/json',
                'accept': 'application/json'
            }),
            withCredentials: true,
            responseType: 'json' as const
        };

        return this.http.post<TokenResponse>(
            "api/token", { email, password }, httpOptions
        )
        .pipe(
            tap(res => this.setSession(res)),
            catchError(this.handleError),
            shareReplay()
        );
    }

    private setSession(res: TokenResponse): void {
        // -- Access Token --
        const accessExp = moment().add(res.access_token.exp.valueOf(), 'seconds');
        const accessToken: string = res.access_token.token;
        localStorage.setItem("access_exp", JSON.stringify(accessExp.valueOf()));
        localStorage.setItem("access_token", accessToken);
        
        // -- Refresh Token --
        const refreshExp = moment().add(res.refresh_token.exp.valueOf(), 'seconds');
        const refreshToken: string = res.refresh_token.token;
        localStorage.setItem("refresh_exp", JSON.stringify(refreshExp.valueOf()));
        localStorage.setItem("refresh_token", refreshToken);
    }

    logout(): void {
        localStorage.removeItem("access_exp");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_exp");
        localStorage.removeItem("refresh_token");
    }

    public isLoggedIn(): boolean {
        return moment().isBefore(this.getAccessExpiration());
    }

    isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }

    private getAccessExpiration(): moment.Moment {
        const exp = localStorage.getItem("access_exp");

        if (exp) {
            const expiresAt: string = JSON.parse(exp);
            return moment(expiresAt);
        
        } else {
            throw new Error("The 'access_exp' is null or not exists");
        }
    }

    private getRefreshExpiration(): moment.Moment {
        const exp = localStorage.getItem("refresh_exp");

        if (exp) {
            const expiresAt: string = JSON.parse(exp);
            return moment(expiresAt);
        
        } else {
            throw new Error("The 'refresh_exp' is null or not exists");
        }
    }

    refreshTokens(value: string) {
        return this.http.post<TokenResponse>("api/refresh", { token: value })
            .subscribe(res => this.setSession(res));
    }

    getHealth(): object {
        return this.http.get<object>("api/actuator/health")
            .subscribe(data => console.log(data))
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          console.error('An error occurred:', error.error);
        } else {
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
