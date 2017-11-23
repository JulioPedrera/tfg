import { Component } from '@angular/core';
import { NavController, NavParams, Alert } from 'ionic-angular';
import { ApiComponents } from '../../app/components/api-components';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'page-graphs',
  templateUrl: 'graphs.html'
})
export class Graphs {



  constructor(
    private apiComponents: ApiComponents,
		private translate: TranslateService) {
    }



  openInfoModal(){
    this.apiComponents.createAlertForInfo().then((alert: Alert) => {
      alert.present();
    });
  }
}
