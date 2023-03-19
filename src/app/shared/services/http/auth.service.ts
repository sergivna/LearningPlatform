import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

const TOKEN_KEY = "token";

@Injectable({ providedIn: 'root' })
export class AuthService{
    constructor(private http: HttpClient)
    {}

    public fetchToken() {
        this.http.get<{ token: string }>("http://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions")
            .subscribe(
                (data) => {
                    if (data.token) {
                        this.setToken(data.token);
                    }
                });  
    }

    public getToken() {
       return localStorage.getItem(TOKEN_KEY);
    }

    setToken(token: string) {
        localStorage.setItem(TOKEN_KEY, token);
    }
}