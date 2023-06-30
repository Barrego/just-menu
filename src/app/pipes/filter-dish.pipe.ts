import { Pipe, PipeTransform } from "@angular/core";

import { IDish } from "../types/dish.types";

@Pipe({
    name: "filterDishes",
    standalone: true,
})
export class FilterDishesPipe implements PipeTransform {
    transform(items: IDish[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter((it) => {
            return (
                it.name.toLowerCase().includes(searchText) ||
                !!it.tags.data.find((tag) =>
                    tag.attributes.name.toLowerCase().includes(searchText)
                )
            );
        });
    }
}
