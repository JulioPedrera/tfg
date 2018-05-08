import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalDataService } from '../../app/local-data.service';


/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public localDataService: LocalDataService) {
  }

  ionViewDidLoad() {
    let user = this.localDataService.getUser();
		if (!user || user == null) {
			this.navCtrl.setRoot("LoginPage");
		}
		console.log("checkUser");
  }


}
