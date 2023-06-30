import { IMultiData, ISingleData } from "./api.types";
import { IImage } from "./image.type";
import { IIngredientQuantity } from "./ingredient.type";

export interface ITag {
    id: number;
    name: string;
}

export interface IDish {
    id: number;
    name: string;
    recipe: string;
    image: ISingleData<IImage>;
    tags: IMultiData<ITag>;
    ingredient_quantities: IMultiData<IIngredientQuantity>;
}

export interface IDishPayload {
    name: string;
    image: number;
    ingredient_quantities: number[];
    tags: number[];
    recipe: string;
}
