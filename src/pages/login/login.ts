import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Loading, Alert } from 'ionic-angular';
import { LocalDataService } from '../../app/local-data.service';
import { User } from '../../app/models/user.model';
import { ApiComponents } from '../../components/api-components';
import { ServiceWS } from '../../app/webservice/WS.service';
import { Profesor } from '../../app/models/profesor.model';
import { News } from '../../app/models/news.model';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userInput: string;
  passInput: string;
  usersOk: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public localDataService: LocalDataService,
    public menu: MenuController,
    private apiComponents: ApiComponents,
    private serviceWS: ServiceWS) {
      this.init();
  }

  init(){
    /*this.serviceWS.makeRequestProfes().then((response) => {
      this.usersOk = true;
    })*/
    this.serviceWS.getProfesJson().then((response) => {
      this.usersOk = true;
    })
    this.serviceWS.makeRequestNews().then((response) => {
      let news: News[] = response;
      this.serviceWS.makeRequestNewsTfg().then((response) => {
        response.forEach(element => {
          news.push(element)
        })
        this.serviceWS.makeRequestNewsTfm().then((response) => {
          response.forEach(element => {
            news.push(element)
          })
          this.serviceWS.makeRequestNewsPgpi().then((response) => {
            response.forEach(element => {
              news.push(element)
            })
            this.serviceWS.makeRequestNewsIr().then((response) => {
              response.forEach(element => {
                news.push(element)
              })
              this.serviceWS.makeRequestNewsPsg().then((response) => {
                response.forEach(element => {
                  news.push(element)
                })
                this.serviceWS.makeRequestNewsIissi().then((response) => {
                  response.forEach(element => {
                    news.push(element)
                  })
                  this.localDataService.setNews(news);
                })
              })
            })
          })
        })
      })
    })
  }

  entrar() {
    this.apiComponents.createLoading().then((loading: Loading) => {
      loading.present();
      if (this.usersOk) {
        let loginName = "";
        if ((this.userInput == "admin" && this.passInput == "1234")
          || (this.userInput == "invitado" && this.passInput == "invitado")) {
            loginName = this.userInput;
        } else {
          let usersProfes: Profesor[] = this.localDataService.getProfes();
          usersProfes.forEach(elem => {
            if (elem.nombre.split(",")[0] == this.userInput && elem.despacho == this.passInput) {
              loginName = elem.nombre;
            }
          })
        }
        if (loginName != "") {
          this.menu.enable(true);
          let user = new User();
          user.setName(loginName);
          user.setPassword(this.passInput);
          this.localDataService.setUser(user);
          this.navCtrl.setRoot("TabsPage");
          loading.dismiss();
        } else {
          loading.dismiss();
          this.apiComponents.createAlertLoginIncorrect().then((alert: Alert) => {
            alert.present();
          });
        }
      }
    })
  }

  ionViewDidLoad() {
    if(this.localDataService.getUser() != null){
      this.navCtrl.setRoot("TabsPage");
      this.menu.enable(true);
    }else{
      this.menu.enable(false);
    }
  }

}
