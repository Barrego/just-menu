import { Pipe, PipeTransform } from "@angular/core";

import { IIngredient } from "../types/ingredient.type";

@Pipe({
    name: "filterIngredients",
    standalone: true,
})
export class FilterIngredientsPipe implements PipeTransform {
    transform(items: IIngredient[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter((it) => {
            return it.name.toLowerCase().includes(searchText);
        });
    }
}
