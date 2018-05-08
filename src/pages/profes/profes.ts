import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import { ApiComponents } from '../../components/api-components';
import { LocalDataService } from '../../app/local-data.service';
import { Profesor } from '../../app/models/profesor.model';

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

  profes: Profesor[];
  profesAll: Profesor[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private apiComponents: ApiComponents,
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
    this.profesAll = this.profes;
  }

  public searchBar(ev: any) {
		let val = ev.target.value;
		if (val && val.trim() != '') {
			let filterProfs: Profesor[] = [];
			this.profesAll.forEach(elem => {
				if(elem.nombre.toLowerCase().includes(val.toLowerCase())){
					filterProfs.push(elem)
				}
			});
			this.profes = filterProfs;
		} else{
			this.profes = this.profesAll;
		}
  }

  ionViewDidLoad() {
    let user = this.localDataService.getUser();
		if (!user || user == null) {
			this.navCtrl.setRoot("LoginPage");
		}
		console.log("checkUser");
  }

}
