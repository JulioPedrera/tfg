import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { LocalDataService } from '../../app/local-data.service';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

	tab1Root: any = "NewsPage";
	tab2Root: any = "GraphsPage";
	tab3Root: any = "ProfesPage";
	tab4Root: any = "PerfilPage";
	mySelectedIndex: number;
	menuOptions: any;

	tabHiddenHide = true;
	
	constructor(
		public appCtrl: App,
		public localDataService: LocalDataService,
		public navCtrl: NavController,
		navParams: NavParams) {
			this.mySelectedIndex = navParams.data.tabIndex || 0;

			if(!this.localDataService.getUser() ||  this.localDataService.getUser() == null){
				this.navCtrl.setRoot("LoginPage");
			}
	}
	
	onChange(){
		if(!this.localDataService.getUser() ||  this.localDataService.getUser() == null){
			this.navCtrl.setRoot("LoginPage");
		}
	}
}
