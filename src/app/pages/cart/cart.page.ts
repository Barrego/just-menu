import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Observable, tap } from "rxjs";
import { Router } from "@angular/router";
import { jsPDF } from "jspdf";

import { CartService } from "../../services/cart.service";
import { ICartList } from "../../types/cart.types";
import { PopupService } from "../../services/popup.service";
import { IIngredient } from "../../types/ingredient.type";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.page.html",
    styleUrls: ["./cart.page.scss"],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class CartPage {
    public cartList$: Observable<ICartList>;
    public cartList: ICartList = {
        products: [],
    };

    public constructor(
        private router: Router,
        private cartService: CartService,
        private popupSrvc: PopupService
    ) {
        this.cartList$ = this.cartService.cartList.pipe(
            tap((cartList) => {
                this.cartList = cartList;
            })
        );
    }

    public removeFromCart({ id, name }: IIngredient): void {
        this.popupSrvc.presentToast(`¡Se ha eliminado ${name} de tu cesta!`);
        this.cartService.removeFromCart(id);
    }

    public comparePrices(): void {
        this.router.navigate(["/prices-compare"]);
    }

    public exportPdf(): void {
        console.log("Generating PDF: ", this.cartList);
        const doc = new jsPDF();
        const data = this.cartList?.products.map((item: any) => ({
            Nombreproducto: item?.ingredient?.name,
            cantidad:
                item?.amount.toString() + item?.ingredient?.measurementUnit,
        }));
        console.log(data);
        doc.table(10, 10, data, ["Nombreproducto", "cantidad"], {});
        doc.save("lista.pdf");
    }
}
