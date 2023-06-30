import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule, ModalController } from "@ionic/angular";
import { Observable } from "rxjs";

import { ICartProduct } from "../../types/cart.types";
import { ProductCardComponent } from "../../pages/products/product-card/product-card.component";
import { ApiService } from "../../services/api.service";
import { IIngredient } from "../../types/ingredient.type";
import { FilterIngredientsPipe } from "../../pipes/filter-ingredient.pipe";

@Component({
    selector: "app-ingredients-picker",
    templateUrl: "./ingredients-picker.component.html",
    styleUrls: ["./ingredients-picker.component.scss"],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ProductCardComponent, FilterIngredientsPipe],
})
export class IngredientsPickerComponent {
    public ingredients$: Observable<IIngredient[]>;
    public searchText = "";
    public selectedIngredients: ICartProduct[] = [];

    public constructor(private modalCtrl: ModalController, private apiSrvc: ApiService) {
        this.ingredients$ = this.apiSrvc.getIngredients();
    }

    public confirm(): Promise<boolean> {
        return this.modalCtrl.dismiss(this.selectedIngredients, "confirm");
    }

    public cancel(): Promise<boolean> {
        return this.modalCtrl.dismiss(null, "cancel");
    }

    public handleIngredientAdded(newProduct: ICartProduct): void {
        const existingProduct = this.selectedIngredients.find(
            (product) => product.ingredient.id === newProduct.ingredient.id
        );

        if (existingProduct) {
            existingProduct.amount += newProduct.amount;
        } else {
            console.log("Adding new ingredient: ", newProduct);
            this.selectedIngredients.push(newProduct);
        }
        console.log("Updated ingrdient list: ", this.selectedIngredients);
    }
}
