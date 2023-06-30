import { Injectable } from "@angular/core";
import { LoadingController, ToastController } from "@ionic/angular";

@Injectable({
    providedIn: "root",
})
export class PopupService {
    public constructor(private toastCtrlr: ToastController, private loadingCtrlr: LoadingController) {}

    public async presentToast(text: string): Promise<void> {
        const toast = await this.toastCtrlr.create({
            message: text,
            duration: 2000,
            position: "bottom",
            color: "dark",
        });

        await toast.present();
    }

    public async presentLoader(): Promise<void> {
        await this.loadingCtrlr.create({
            mode: "ios"
        });
    }

    public async hideLoader(): Promise<void> {
        await this.loadingCtrlr.dismiss();
    }
}
