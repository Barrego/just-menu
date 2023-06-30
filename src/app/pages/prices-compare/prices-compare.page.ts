import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { Observable, tap } from "rxjs";

import { ProductPriceCardComponent } from "./product-price-card/product-price-card.component";
import { ICartList } from "../../types/cart.types";
import { CartService } from "../../services/cart.service";
import { IMarketPrices } from "../../types/prices.type";
import { MeasurementUnit } from "../../types/ingredient.type";

@Component({
    selector: "app-prices-compare",
    templateUrl: "./prices-compare.page.html",
    styleUrls: ["./prices-compare.page.scss"],
    standalone: true,
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ProductPriceCardComponent,
    ],
})
export class PricesComparePage implements OnInit {
    public cartList$?: Observable<ICartList>;
    public marketPrices?: IMarketPrices;

    public constructor(private router: Router, private cartSrvc: CartService) {
        this.cartList$ = this.cartSrvc.cartList.pipe(
            tap((cartList) => {
                let newMarketPrices: IMarketPrices = {
                    carrefour: {
                        name: "Carrefour",
                        amount: 0,
                    },
                    dia: {
                        name: "Dia",
                        amount: 0,
                    },
                    mercadona: {
                        name: "Mercadona",
                        amount: 0,
                    },
                };
                cartList.products.forEach((product) => {
                    product.ingredient.prices.data?.forEach((price) => {
                        const marketName =
                            price.attributes.market.data?.attributes.name || "";
                        const newProductPrice = this.getRelativePrice(product.amount, price.attributes.amount, product.ingredient.measurementUnit);

                        if (marketName === "Carrefour") {
                            newMarketPrices.carrefour = {
                                name: "Carrefour",
                                amount: newMarketPrices.carrefour.amount + newProductPrice,
                            };
                        } else if (marketName === "Dia") {
                            newMarketPrices.dia = {
                                name: "Dia",
                                amount: newMarketPrices.dia.amount + newProductPrice,
                            };
                        } else if (marketName === "Mercadona") {
                            newMarketPrices.mercadona = {
                                name: "Mercadona",
                                amount: newMarketPrices.mercadona.amount + newProductPrice,
                            };
                        }
                    });
                });

                this.marketPrices = newMarketPrices;
            })
        );
    }

    public ngOnInit() {}

    public clearCartList(): void {
        this.cartSrvc.clearCart();
        this.router.navigate(["/dishes"]);
    }

    private getRelativePrice(productAmount: number, basePrice: number, measurementUnit: MeasurementUnit): number {
        let relativePrice = 0;
        if (measurementUnit === MeasurementUnit.G || measurementUnit === MeasurementUnit.ML) {
            relativePrice = Number(((productAmount * basePrice) / 1000).toFixed(2));
        } else if (measurementUnit === MeasurementUnit.UNITS || measurementUnit === MeasurementUnit.SPOON || measurementUnit === MeasurementUnit.TEASPOON) {
            relativePrice = Number((productAmount * basePrice).toFixed(2));
        }
        return relativePrice;
    }
}
