import { Injectable } from "@angular/core";

import { ApiService } from "./api.service";
import { Camera, CameraResultType } from "@capacitor/camera";

@Injectable({
    providedIn: "root",
})
export class ImageUploadService {
    public constructor(private apiSrvc: ApiService) {}

    public async captureAndUploadImage(): Promise<any> {
        const dataUrl = await this.takePicture();
        return this.uploadImage(dataUrl || "");
    }

    private async takePicture(): Promise<string | undefined> {
        const image = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            quality: 90,
            allowEditing: true,
        });
        return image.dataUrl;
    }

    private async uploadImage(dataUrl: string): Promise<Object> {
        const response = await fetch(dataUrl);
        const blob = await response.blob();

        const formData = new FormData();
        formData.append("files", blob);

        return this.apiSrvc.uploadDishImage(formData);
    }
}
