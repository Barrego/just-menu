import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AlertController, IonicModule } from "@ionic/angular";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { AuthService } from "../../services/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.scss"],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class LoginPage implements OnInit {
    public username: string | undefined;
    public password: string | undefined;
    private subs: Subscription[] = [];

    public constructor(
        private readonly auth: AuthService,
        private readonly router: Router,
        private readonly alertController: AlertController
    ) {}

    public ngOnInit() {}

    ngOnDestroy(): void {
        this.subs.forEach((sub: Subscription) => sub.unsubscribe());
    }

    public login(): void {
        const user = {
            identifier: this.username,
            password: this.password,
        };
        const sub = this.auth.login(user).subscribe(
            (user) => {
                sessionStorage.setItem("user", JSON.stringify(user));
                this.router.navigateByUrl("/dishes");
            },
            async (error) => {
                const alert = await this.alertController.create({
                    header: "Usuario/contraseña incorrecto",
                    subHeader: "El usuario/contraseña introducido no existe",
                    buttons: ["OK"],
                });

                await alert.present();
            }
        );
        this.subs.push(sub);
    }

    public register() {
        this.router.navigateByUrl("/register");
    }
}
