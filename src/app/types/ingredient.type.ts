import { IMultiData, ISingleData } from "./api.types";
import { IDish } from "./dish.types";
import { IImage } from "./image.type";
import { IPrice } from "./prices.type";

export enum MeasurementUnit {
    G = "g",
    ML = "ml",
    UNITS = "units",
    SPOON = "spoon",
    TEASPOON = "teaspoon",
}

export interface IIngredient {
    id: number;
    name: string;
    image: ISingleData<IImage>;
    measurementUnit: MeasurementUnit;
    prices: IMultiData<IPrice>;
}

export interface IIngredientQuantity {
    quantity: number;
    ingredient: ISingleData<IIngredient>;
    dish: ISingleData<IDish>;
}

// Payload
export interface IIngredientQuantityPayload {
    ingredient: number;
    quantity: number;
}
