import { Injectable } from '@angular/core';
import { LoadingController, Loading, AlertController, Alert } from 'ionic-angular';

import { TranslateService } from 'ng2-translate';

@Injectable()
export class ApiComponents {

    constructor(
        public loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        private translate: TranslateService) { }

        createAlertForInfo(): Promise<Alert> {
            return new Promise((resolve, reject) => {
                /*let promises = [this.translate.get('OK').toPromise()];
                Promise.all(promises).then((strings: string[]) => {*/


                    let alert = this.alertCtrl.create({
                        title: 'Title',
                        subTitle: 'Subtitle',
                        buttons: [
                            {
                                text: 'OK',
                                handler: () => {
                                }
                            }
                        ]
                    });
                    resolve(alert);
                });
            
        }

}
