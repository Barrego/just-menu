import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Observable, lastValueFrom } from "rxjs";

import { IMultiData, ISingleData } from "../types/api.types";
import { IDish, IDishPayload, ITag } from "../types/dish.types";
import { AppConfig } from "../app.constants";
import { ApiConfig } from "../api.constants";
import {
    IIngredient,
    IIngredientQuantity,
    IIngredientQuantityPayload,
} from "../types/ingredient.type";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    public constructor(private httpClient: HttpClient) {}

    public getDishes(): Observable<IDish[]> {
        return this.httpClient
            .get<IMultiData<IDish>>(
                AppConfig.API_URL + ApiConfig.DISHES + "?populate=deep,6",
                {
                    headers: {
                        Authorization: `Bearer ${AppConfig.API_AUTH_TOKEN}`,
                    },
                }
            )
            .pipe(
                map(({ data }) => {
                    const dishes: IDish[] = data.map((dish) => ({
                        id: dish.id,
                        name: dish.attributes.name,
                        image: dish.attributes.image,
                        recipe: dish.attributes.recipe,
                        tags: dish.attributes.tags,
                        ingredient_quantities:
                            dish.attributes.ingredient_quantities,
                    }));
                    return dishes;
                }),
                tap((dishes) => {
                    console.log("Dishes list: ", dishes);
                })
            );
    }

    public getDish(dishId: string | null): Observable<IDish> {
        return this.httpClient
            .get<ISingleData<IDish>>(
                AppConfig.API_URL +
                    ApiConfig.DISHES +
                    "/" +
                    dishId +
                    "?populate=deep,6",
                {
                    headers: {
                        Authorization: `Bearer ${AppConfig.API_AUTH_TOKEN}`,
                    },
                }
            )
            .pipe(
                map(({ data }) => {
                    const dish: IDish = {
                        id: data.id,
                        name: data.attributes.name,
                        image: data.attributes.image,
                        recipe: data.attributes.recipe,
                        tags: data.attributes.tags,
                        ingredient_quantities:
                            data.attributes.ingredient_quantities,
                    };
                    return dish;
                })
            );
    }

    public getIngredients(): Observable<IIngredient[]> {
        return this.httpClient
            .get<IMultiData<IIngredient>>(
                AppConfig.API_URL + ApiConfig.INGREDIENTS + "?populate=deep,4",
                {
                    headers: {
                        Authorization: `Bearer ${AppConfig.API_AUTH_TOKEN}`,
                    },
                }
            )
            .pipe(
                map(({ data }) => {
                    const ingredients: IIngredient[] = data.map(
                        (ingredient) => ({
                            id: ingredient.id,
                            name: ingredient.attributes.name,
                            image: ingredient.attributes.image,
                            measurementUnit:
                                ingredient.attributes.measurementUnit,
                            prices: ingredient.attributes.prices,
                        })
                    );
                    return ingredients;
                }),
                tap((ingredients) => {
                    console.log("Ingredients list: ", ingredients);
                })
            );
    }

    public getTags(): Observable<ITag[]> {
        return this.httpClient
            .get<IMultiData<ITag>>(AppConfig.API_URL + ApiConfig.TAGS, {
                headers: {
                    Authorization: `Bearer ${AppConfig.API_AUTH_TOKEN}`,
                },
            })
            .pipe(
                map(({ data }) => {
                    const tags: ITag[] = data.map((tag) => ({
                        id: tag.id,
                        name: tag.attributes.name,
                    }));
                    return tags;
                }),
                tap((tags) => {
                    console.log("Tags list: ", tags);
                })
            );
    }

    public uploadDishImage(formData: FormData) {
        return lastValueFrom(
            this.httpClient.post(
                AppConfig.API_URL + ApiConfig.UPLOAD,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${AppConfig.API_AUTH_TOKEN}`,
                    },
                }
            )
        );
    }

    public createIngredientsQuantity(
        ingredientsQuantities: IIngredientQuantityPayload[]
    ): Promise<any> {
        const ingredientsQttyPromises: Promise<Object>[] = [];

        ingredientsQuantities.forEach((ingredientQtty) => {
            ingredientsQttyPromises.push(
                lastValueFrom(
                    this.httpClient.post(
                        AppConfig.API_URL + ApiConfig.INGREDIENTS_QUANTITY,
                        { data: ingredientQtty },
                        {
                            headers: {
                                Authorization: `Bearer ${AppConfig.API_AUTH_TOKEN}`,
                            },
                        }
                    )
                )
            );
        });

        return Promise.all(ingredientsQttyPromises);
    }

    public createDish(dishPayload: IDishPayload): Promise<any> {
        return lastValueFrom(
            this.httpClient.post(
                AppConfig.API_URL + ApiConfig.DISHES,
                { data: dishPayload },
                {
                    headers: {
                        Authorization: `Bearer ${AppConfig.API_AUTH_TOKEN}`,
                    },
                }
            )
        );
    }
}
