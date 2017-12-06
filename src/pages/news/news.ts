import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, Loading } from 'ionic-angular';
import { ApiComponents } from '../../components/api-components';
import { ServiceWS } from '../../app/webservice/WS.service';
import { News } from '../../app/models/news.model';
import { LocalDataService } from '../../app/local-data.service';
import _ from "underscore";

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  news: News[];
  newsAll: News[];
  segment: string = 'option1';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private apiComponents: ApiComponents,
    private serviceWS: ServiceWS,
    private localDataService: LocalDataService) 
    {

      if(localDataService.getUser() == null){
        this.navCtrl.setRoot("LoginPage");
      }
      this.getNews();
    }

  getNews(){
    this.apiComponents.createLoading().then((loading: Loading) => {
      loading.present()
      this.serviceWS.makeRequestNews().then((response) => {
        this.newsAll = response;
        this.filterByTipo("General");
        this.orderCardsBy('fecha');
        loading.dismiss();
      }).catch(() => {
        loading.dismiss();
      })
    })
  }
  
  openInfoModal(){
    this.apiComponents.createAlertForInfo().then((alert: Alert) => {
      alert.present();
    });
  }

  onChangeSegment(status: number){
    status == 1 ? this.filterByTipo("General")
    : status == 2 ? this.filterByTipo("Asignatura")
    : status == 3 ? this.filterByTipo("Máster ITS")
    : this.filterByTipo("Doctorado");
  }

  filterByTipo(tipo: string){
    this.news = [];
    this.newsAll.forEach(elem => {
      elem.tipo == tipo ? this.news.push(elem):null;
    });
  }

 truncateText(item) {
    let truncated = item.descripcion;
    if (item.truncate && truncated.length > 180) {
        truncated = truncated.substr(0,180) + '...';
    }
    return truncated;
  }

  changeView(item){
    item.truncate = !item.truncate;
  }

  orderCardsBy(attribute){
		this.news=_.sortBy(this.news,attribute).reverse();
  }
  
}
