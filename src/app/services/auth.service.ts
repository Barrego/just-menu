import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AppConfig } from "../app.constants";
import { ApiConfig } from "../api.constants";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private http: HttpClient) {}

    public login(dataUser: {
        identifier: string | undefined;
        password: string | undefined;
    }): Observable<any> {
        return this.http.post(AppConfig.BASE_URL + ApiConfig.USERS, dataUser);
    }

    public isLogged(): boolean {
        return Boolean(sessionStorage.getItem("user"));
    }
}
