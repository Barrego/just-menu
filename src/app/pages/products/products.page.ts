import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Observable } from "rxjs";

import { CartService } from "../../services/cart.service";
import { ApiService } from "../../services/api.service";
import { IIngredient } from "../../types/ingredient.type";
import { ProductCardComponent } from "./product-card/product-card.component";
import { ICartProduct } from "../../types/cart.types";
import { FilterIngredientsPipe } from "../../pipes/filter-ingredient.pipe";

@Component({
    selector: "app-products",
    templateUrl: "./products.page.html",
    styleUrls: ["./products.page.scss"],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ProductCardComponent, FilterIngredientsPipe],
})
export class ProductsPage implements OnInit {
    public ingredients$: Observable<IIngredient[]>;
    public searchText = "";

    public constructor(private apiSrvc: ApiService, private cartService: CartService) {
        this.ingredients$ = this.apiSrvc.getIngredients();
    }

    public ngOnInit() {}

    public handleCartProductAdded(cartProduct: ICartProduct): void {
        this.cartService.addToCart([cartProduct]);
    }
}
