import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { ApiConfig } from "../api.constants";
import { AppConfig } from "../app.constants";

@Injectable({
    providedIn: "root",
})
export class RegisterService {
    constructor(private http: HttpClient) {}

    public register(dataregister: {
        username: any;
        email: any;
        password: any;
    }): Observable<any> {
        return this.http.post(
            AppConfig.BASE_URL + ApiConfig.USERS_REGISTER,
            dataregister
        );
    }
    public isRegister(): boolean {
        return Boolean(sessionStorage.getItem("user"));
    }
}
