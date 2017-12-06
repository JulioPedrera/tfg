import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, MenuController, Alert, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalDataService } from './local-data.service';
import { User } from './models/user.model';
import { ApiComponents } from '../components/api-components';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = "LoginPage";
  pages: Array<{ title: string, component: any, index: number }>;
  userLogged: User = this.localDataService.getUser();

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public localDataService: LocalDataService,
    public appCtrl: App,
    public menu: MenuController,
    public apiComponents: ApiComponents,
    public modalCtrl: ModalController) {

    this.initializeApp();

    this.pages = [
      { title: 'Noticias', component: "NewsPage", index: 0 },
      { title: 'Estadísticas', component: "GraphsPage", index: 1 },
      { title: 'Profesores', component: "ProfesPage", index: 2 },
      { title: 'Perfil', component: "PerfilPage", index: 3 },
      { title: 'Contacto', component: "ContactPage", index: 4 },
      { title: 'Salir', component: "LoginPage", index: 5 },
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
    this.menu.close();
    if (page.title == 'Salir') {
      this.apiComponents.createConfirmExit().then((alert: Alert) => {
        alert.present();
      });
    } else {
      if (page.title == 'Contacto') {
        this.presentModalContact();
      } else {
        this.appCtrl.getRootNav().setRoot("TabsPage", { tabIndex: page.index });
      }
    }
  }

  presentModalContact(){
    let profileModal = this.modalCtrl.create("ContactPage");
    profileModal.present();
  }
}
