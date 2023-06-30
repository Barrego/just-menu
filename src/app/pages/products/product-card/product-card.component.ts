import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

import { IIngredient, MeasurementUnit } from "../../../types/ingredient.type";
import { ICartProduct } from "../../../types/cart.types";
import { PopupService } from "../../../services/popup.service";

@Component({
    selector: "app-product-card",
    templateUrl: "./product-card.component.html",
    styleUrls: ["./product-card.component.scss"],
    standalone: true,
    imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class ProductCardComponent implements OnInit {
    private readonly MIN_AMOUNT_VALUE = 0;

    private modifyAmountStep = 1;

    @Input() public product!: IIngredient;
    @Input() public isCartSelection = true;
    @Output() public onCartProductAdded = new EventEmitter<ICartProduct>();

    public productAmount = new FormControl(this.MIN_AMOUNT_VALUE);

    public constructor(private popupSrvc: PopupService) {}

    public ngOnInit(): void {
        this.modifyAmountStep = this.setAmountStep(
            this.product.measurementUnit
        );
    }

    public modifyAmount(command: "add" | "subtract") {
        let currentAmount = this.productAmount.value || this.MIN_AMOUNT_VALUE;
        if (command === "add") {
            currentAmount = currentAmount + this.modifyAmountStep;
        } else if (
            command === "subtract" &&
            currentAmount - this.modifyAmountStep > this.MIN_AMOUNT_VALUE
        ) {
            currentAmount = currentAmount - this.modifyAmountStep;
        }

        this.productAmount.setValue(currentAmount);
    }

    public addCartProduct(ingredient: IIngredient): void {
        if (this.productAmount.value) {
            this.onCartProductAdded.emit({
                amount: this.productAmount.value || this.MIN_AMOUNT_VALUE,
                ingredient,
            });
            this.productAmount.setValue(this.MIN_AMOUNT_VALUE);
            this.popupSrvc.presentToast(`¡Se ha añadido ${ingredient.name} añadido a ${this.isCartSelection ? "la cesta" : "tus ingredientes"}!`);
        }
    }

    private setAmountStep(measurementUnit: MeasurementUnit): number {
        let modifyAmountStep = 1;
        if (
            measurementUnit === MeasurementUnit.G ||
            measurementUnit === MeasurementUnit.ML
        ) {
            modifyAmountStep = 10;
        } else if (measurementUnit === MeasurementUnit.UNITS) {
            modifyAmountStep = 1;
        } else if (
            measurementUnit === MeasurementUnit.SPOON ||
            measurementUnit === MeasurementUnit.TEASPOON
        ) {
            modifyAmountStep = 0.5;
        }
        return modifyAmountStep;
    }
}
