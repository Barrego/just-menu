import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { ICartProduct } from "../../../types/cart.types";
import { MeasurementUnit } from "../../../types/ingredient.type";

@Component({
    selector: "app-product-price-card",
    templateUrl: "./product-price-card.component.html",
    styleUrls: ["./product-price-card.component.scss"],
    standalone: true,
    imports: [IonicModule, CommonModule]
})
export class ProductPriceCardComponent implements OnInit {
    @Input() public product!: ICartProduct;

    public constructor() {}

    public ngOnInit() {}

    public getRelativePrice(productAmount: number, basePrice: number, measurementUnit: MeasurementUnit): number {
        let relativePrice = 0;
        if (measurementUnit === MeasurementUnit.G || measurementUnit === MeasurementUnit.ML) {
            relativePrice = Number(((productAmount * basePrice) / 1000).toFixed(2));
        } else if (measurementUnit === MeasurementUnit.UNITS || measurementUnit === MeasurementUnit.SPOON || measurementUnit === MeasurementUnit.TEASPOON) {
            relativePrice = Number((productAmount * basePrice).toFixed(2));
        }
        return relativePrice;
    }
}
