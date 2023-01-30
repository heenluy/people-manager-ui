import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { shareReplay, tap } from "rxjs";

import * as moment from "moment";

import { User } from "../models/user.model";
import { SuccessAuthResponse } from "../models/auth-response.model";

@Injectable()
export class AuthService {

    baseUrl = '';

    constructor(private http: HttpClient) {}

    createAccount(email: string, password: string) {
        return this.http.post<User>(this.baseUrl, { email, password });
    }
    
    login(email: string, password: string) {
        return this.http.post<SuccessAuthResponse>(this.baseUrl, { email, password })
        .pipe(
            tap(res => this.setSession(res)),
            shareReplay()
        );
    }

    private setSession(res: SuccessAuthResponse): void {
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

    getAccessExpiration(): moment.Moment {
        const exp = localStorage.getItem("access_exp");
        const expiresAt: string = JSON.parse(exp!);
        return moment(expiresAt);
    }

    getRefreshExpiration(): moment.Moment {
        const exp = localStorage.getItem("refresh_exp");
        const expiresAt: string = JSON.parse(exp!);
        return moment(expiresAt);
    }

    refreshTokens(value: string) {
        return this.http.post<SuccessAuthResponse>(`${ this.baseUrl }`, { token: value })
            .subscribe(res => this.setSession(res));
    }
}