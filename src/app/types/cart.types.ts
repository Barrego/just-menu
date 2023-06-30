import { IIngredient } from "./ingredient.type";

export interface ICartList {
    products: ICartProduct[];
}

export interface ICartProduct {
    ingredient: IIngredient;
    amount: number;
};
