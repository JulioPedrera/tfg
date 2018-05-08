import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Keyboard } from 'ionic-angular';
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
	showFooter: boolean = true;

	constructor(
		public appCtrl: App,
		public localDataService: LocalDataService,
		public navCtrl: NavController,
		navParams: NavParams,
		public keyboard: Keyboard) {
		this.mySelectedIndex = navParams.data.tabIndex || 0;
	}

	keyboardCheck() {
		if (this.keyboard.isOpen()) {
			// You logic goes here
			this.showFooter = false;
		}
	}
}
