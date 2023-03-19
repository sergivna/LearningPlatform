import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const TOKEN_KEY = "token";

@Injectable({ providedIn: 'root' })
export class AuthService{
    private api = {
        token: 'auth/anonymous?platform=subscriptions',
    }

    constructor(private http: HttpClient)
    {}

    public fetchToken() {
        this.http.get<{ token: string }>(`${environment.baseURL}/${environment.apiURL}/${this.api.token}`)
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