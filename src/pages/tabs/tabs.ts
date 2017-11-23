import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { LocalDataService } from '../../app/local-data.service';
import { News } from '../news/news';
import { Graphs } from '../graphs/graphs';
import { Profes } from '../profes/profes';
import { Perfil } from '../perfil/perfil';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class Tabs {

	tab1Root: any = News;
	tab2Root: any = Graphs;
	tab3Root: any = Profes;
	tab4Root: any = Perfil;
	mySelectedIndex: number;
	menuOptions: any;

	tabHiddenHide = true;
	
	constructor(
		public appCtrl: App,
		public localDataService: LocalDataService,
		public navCtrl: NavController,
		navParams: NavParams) {
			this.mySelectedIndex = navParams.data.tabIndex || 0;
			
	}
}
