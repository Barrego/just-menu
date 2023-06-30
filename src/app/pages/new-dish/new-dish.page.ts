import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule, ModalController } from "@ionic/angular";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Router } from "@angular/router";

import { ImageUploadService } from "../../services/image-upload.service";
import { ApiService } from "../../services/api.service";
import {
    IIngredientQuantity,
    IIngredientQuantityPayload,
} from "../../types/ingredient.type";
import { ISingleData } from "../../types/api.types";
import { IDishPayload, ITag } from "../../types/dish.types";
import { TagPickerComponent } from "../../components/tag-picker/tag-picker.component";
import { IngredientsPickerComponent } from "../../components/ingredients-picker/ingredients-picker.component";
import { ICartProduct } from "../../types/cart.types";

interface DishModel {
    name: string;
    recipe: string;
    selectedTags: ITag[];
    selectedIngredients: ICartProduct[];
};

@Component({
    selector: "app-new-dish",
    templateUrl: "./new-dish.page.html",
    styleUrls: ["./new-dish.page.scss"],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, CKEditorModule],
})
export class NewDishPage {

    public recipeEditor = ClassicEditor;
    public dishModel: DishModel = {
        name: "",
        recipe: "",
        selectedTags: [],
        selectedIngredients: []
    };
    public isLoading = false;

    public constructor(
        private imgUploadSrvc: ImageUploadService,
        private apiSrvc: ApiService,
        private modalCtrl: ModalController,
        private router: Router
    ) {
        this.recipeEditor.defaultConfig = {
            language: "es",
            toolbar: {
                items: ["numberedList", "|", "undo", "redo"],
            },
            table: {
                contentToolbar: [],
            },
            image: {
                toolbar: [],
            },
        };
    }

    public async createDish(): Promise<void> {
        this.isLoading = true;
        try {
            const imageData = await this.imgUploadSrvc.captureAndUploadImage();
            const imageId = imageData[0].id;
            console.log("Image Id", imageId);
            const ingredientQuantities: IIngredientQuantityPayload[] = this.dishModel.selectedIngredients.map(product => {
                return {
                    ingredient: product.ingredient.id,
                    quantity: product.amount
                };
            });
            console.log("Ingredient Quantities", ingredientQuantities);
            const ingredientQuantitiesData =
                await this.apiSrvc.createIngredientsQuantity(
                    ingredientQuantities
                );
            const ingredientQuantitiesIds = ingredientQuantitiesData.map(
                (ingdntQtty: ISingleData<IIngredientQuantity>) => ingdntQtty.data.id
            ) as number[];
            const newDish: IDishPayload = {
                name: this.dishModel.name,
                recipe: this.dishModel.recipe,
                ingredient_quantities: ingredientQuantitiesIds,
                image: imageId,
                tags: this.dishModel.selectedTags.map(tag => tag.id),
            };
            console.log("Dish to create: ", newDish);
            const dishData = await this.apiSrvc.createDish(newDish);
            console.log("New dish created", dishData);
            this.router.navigate(["/dishes"]);
        } catch (err) {
            console.error("There was an error while creating the dish");
        } finally {
            this.isLoading = false;
        }
    }

    public async openIngredientsPickerModal() {
        const modal = await this.modalCtrl.create({
            component: IngredientsPickerComponent,
        });
        await modal.present();

        const { data: selectedIngredients, role } = await modal.onWillDismiss<ICartProduct[]>();

        if (role === "confirm") {
            console.log("Selected ingredients: ", selectedIngredients);
            this.dishModel.selectedIngredients = selectedIngredients || [];
        }
    }

    public async openTagPickerModal() {
        const modal = await this.modalCtrl.create({
            component: TagPickerComponent,
        });
        await modal.present();

        const { data: selectedTags, role } = await modal.onWillDismiss<ITag[]>();

        if (role === "confirm") {
            console.log("Selected tags: ", selectedTags);
            this.dishModel.selectedTags = selectedTags || [];
        }
    }

    public isFormValid(): boolean {
        return !!this.dishModel.name && !!this.dishModel.recipe && !!this.dishModel.selectedIngredients.length;
    }
}
