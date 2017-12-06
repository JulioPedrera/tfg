import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import { ApiComponents } from '../../components/api-components';
import { ServiceWS } from '../../app/webservice/WS.service';
import { LocalDataService } from '../../app/local-data.service';

/**
 * Generated class for the ProfesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profes',
  templateUrl: 'profes.html',
})
export class ProfesPage {

  profes: any[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private apiComponents: ApiComponents,
    private serviceWS: ServiceWS,
    public localDataService: LocalDataService) {
      this.getProfes();
    }

  openInfoModal(){
    this.apiComponents.createAlertForInfo().then((alert: Alert) => {
      alert.present();
    });
  }

  getProfes(){
    this.profes = this.localDataService.getProfes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfesPage');
  }

}
