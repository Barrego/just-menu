import { Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
    selector: "app-tabs",
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.scss"],
    standalone: true,
    imports: [IonicModule],
})
export class TabsComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
