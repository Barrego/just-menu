import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Observable, finalize } from "rxjs";
import { Router } from "@angular/router";

import { ApiService } from "../../services/api.service";
import { IDish } from "../../types/dish.types";
import { FilterDishesPipe } from "../../pipes/filter-dish.pipe";

@Component({
    selector: "app-dishes",
    templateUrl: "./dishes.page.html",
    styleUrls: ["./dishes.page.scss"],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, FilterDishesPipe],
})
export class DishesPage {
    public dishes$: Observable<IDish[]>;
    public searchText = "";

    public constructor(private router: Router, private apiSrvc: ApiService) {
        this.dishes$ = this.apiSrvc.getDishes();
    }

    public navigateToDish(dishId: number): void {
        this.router.navigate(["/dishes", dishId]);
    }

    public createDish(): void {
        this.router.navigate(["/new-dish"]);
    }

    public handleRefresh(event: any) {
        this.dishes$ = this.apiSrvc.getDishes().pipe(finalize(() => {
            event.target.complete();
        }));
    }
}
