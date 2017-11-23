import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalDataService } from './local-data.service';
import { TranslateService } from 'ng2-translate';

import { Login } from '../pages/login/login';
import { News } from '../pages/news/news';
import { Graphs } from '../pages/graphs/graphs';
import { Profes } from '../pages/profes/profes';
import { Perfil } from '../pages/perfil/perfil';
import { Tabs } from '../pages/tabs/tabs';
import { User } from './models/user.model';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Tabs;
  pages: Array<{title: string, component: any}>;
  userLogged: User = this.localDataService.getUser();

  constructor(
      public platform: Platform, 
      public statusBar: StatusBar, 
      public splashScreen: SplashScreen,
      public localDataService: LocalDataService,) 
      {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Noticias', component: News },
      { title: 'Estadísticas', component: Graphs },
      { title: 'Profesores', component: Profes },
      { title: 'Perfil', component: Perfil },
      { title: 'Salir', component: Login },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
