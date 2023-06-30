import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Router } from "@angular/router";

import packageInfo from "../../../../package.json";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.page.html",
    styleUrls: ["./settings.page.scss"],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class SettingsPage implements OnInit {
    public APP_VERSION = packageInfo.version;
    public constructor(private router: Router) {}

    public ngOnInit() {}

    public closeSession() {
        const user = sessionStorage.getItem("user");
        console.log("User", user);
        sessionStorage.removeItem("user");
        this.router.navigateByUrl("/login");
    }
}
