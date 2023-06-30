import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { HttpClientModule } from "@angular/common/http";
import { marked } from "marked";

import { IDish } from "../../types/dish.types";
import { CartService } from "../../services/cart.service";
import { ICartProduct } from "../../types/cart.types";
import { ApiService } from "../../services/api.service";

@Component({
    selector: "app-dish",
    templateUrl: "./dish.page.html",
    styleUrls: ["./dish.page.scss"],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class DishPage implements OnInit {
    private readonly MIN_PORTIONS_NUMBER = 1;

    public dish$: Observable<IDish>;
    public markedRecipe = "";
    public portionsNumber: number;

    public constructor(
        private router: Router,
        private route: ActivatedRoute,
        private cartSrvc: CartService,
        private apiSrvc: ApiService
    ) {
        const dishId = this.route.snapshot.paramMap.get("id");
        this.portionsNumber = this.MIN_PORTIONS_NUMBER;

        this.dish$ = this.apiSrvc.getDish(dishId).pipe(
            tap((dish) => {
                this.markedRecipe = marked(dish.recipe);
                console.log("Dish to show: ", dish);
            })
        );
    }

    public ngOnInit() {}

    public modifyPortions(command: "add" | "subtract") {
        if (command === "add") {
            this.portionsNumber++;
        } else if (
            command === "subtract" &&
            this.portionsNumber > this.MIN_PORTIONS_NUMBER
        ) {
            this.portionsNumber--;
        }
    }

    public addProductsToCart({
        ingredient_quantities: { data: ingredientQuantities },
    }: IDish): void {
        const cartProducts = ingredientQuantities.map(
            ({ attributes: { ingredient, quantity } }) => {
                const cartProduct: ICartProduct = {
                    ingredient: ingredient.data.attributes,
                    amount: quantity * this.portionsNumber,
                };
                cartProduct.ingredient.id = ingredient.data.id;

                return cartProduct;
            }
        );
        this.cartSrvc.addToCart(cartProducts);
        this.router.navigate(["/dishes"]);
    }
}
