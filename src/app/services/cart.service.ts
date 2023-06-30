import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";
import { ICartList, ICartProduct } from "../types/cart.types";

@Injectable({
    providedIn: "root",
})
export class CartService {
    private localCartList: ICartList = { products: [] };
    private _cartList = new BehaviorSubject<ICartList>(this.localCartList);

    public constructor() {}

    public get cartList(): Observable<ICartList> {
        return this._cartList.asObservable();
    }

    public addToCart(newCartProducts: ICartProduct[]): void {
        for (const newProduct of newCartProducts) {
            const existingProduct = this.localCartList.products.find(
                (product) => product.ingredient.id === newProduct.ingredient.id
            );

            if (existingProduct) {
                existingProduct.amount += newProduct.amount;
            } else {
                console.log("Adding new product: ", newProduct);
                this.localCartList.products.push(newProduct);
            }
        }
        console.log("Updated cart list: ", this.localCartList);
        this._cartList.next(this.localCartList);
    }

    public removeFromCart(ingredientId: number): void {
        const newCartList = this.localCartList.products.filter(product => product.ingredient.id !== ingredientId);
        this.localCartList.products = [...newCartList];
        console.log("Updated cart list: ", this.localCartList);
        this._cartList.next(this.localCartList);
    }

    public clearCart(): void {
        this.localCartList = {products: []};
        this._cartList.next(this.localCartList);
    }
}
