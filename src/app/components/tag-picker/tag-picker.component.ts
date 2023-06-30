import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { IonicModule, ModalController } from "@ionic/angular";
import { Observable, tap } from "rxjs";

import { ITag } from "../../types/dish.types";
import { ApiService } from "../../services/api.service";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from "@angular/forms";

@Component({
    selector: "app-tag-picker",
    templateUrl: "./tag-picker.component.html",
    styleUrls: ["./tag-picker.component.scss"],
    imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule],
    standalone: true,
})
export class TagPickerComponent implements OnInit {
    public tags$: Observable<ITag[]>;
    public tagsForm: FormGroup;

    private helperTagsList: ITag[] = [];

    public constructor(
        private modalCtrl: ModalController,
        private apiSrvc: ApiService,
        private formBuilder: FormBuilder
    ) {
        this.tagsForm = this.formBuilder.group({});
        this.tags$ = this.apiSrvc.getTags().pipe(
            tap((tags) => {
                this.helperTagsList = tags;
                tags.forEach((tag) => {
                    const formControl = new FormControl(false);
                    this.tagsForm.addControl(tag.id.toString(), formControl);
                });
            })
        );
    }

    public ngOnInit() {}

    public onSelectionChange(event: any, id: string) {
        const formControl = this.tagsForm.get(id);
        if (formControl) {
            formControl.setValue(event.target.checked);
        }
    }

    public confirm(): Promise<boolean> {
        const selectedTags = Object.keys(this.tagsForm.value)
            .filter((key) => this.tagsForm.value[key])
            .map((key) => this.helperTagsList.find((tag) => tag.id.toString() === key));
        console.log("Selected tags: ", selectedTags);
        return this.modalCtrl.dismiss(selectedTags, "confirm");
    }

    public cancel(): Promise<boolean> {
        return this.modalCtrl.dismiss(null, "cancel");
    }
}
