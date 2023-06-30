import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AlertController, IonicModule } from "@ionic/angular";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterService } from "src/app/services/register.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.page.html",
    styleUrls: ["./register.page.scss"],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class RegisterPage implements OnInit {
    public username?: string;
    public password?: string;
    public email?: string;

    private subs: Subscription[] = [];

    constructor(
        private readonly register: RegisterService,
        private readonly router: Router,
        private readonly alertController: AlertController
    ) {}

    ngOnInit() {}

    ngOnDestroy(): void {
        this.subs.forEach((sub: Subscription) => sub.unsubscribe());
    }

    public registrarse(): void {
        const user = {
            username: this.username,
            email: this.email,
            password: this.password,
        };
        const sub = this.register.register(user).subscribe(
            (user) => {
                sessionStorage.setItem("user", JSON.stringify(user));
                this.router.navigateByUrl("/login");
            },
            async (error) => {
                const alert = await this.alertController.create({
                    header: "Usuario/contraseña incorrecto",
                    subHeader: "El usuario introducido ya existe",
                    //        message: 'This is an alert!',
                    buttons: ["OK"],
                });

                await alert.present();
            }
        );
        this.subs.push(sub);
    }
}
