import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, Loading } from 'ionic-angular';
import { ApiComponents } from '../../components/api-components';
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
  newsAll: News[] = [];
  segment: string = 'option1';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apiComponents: ApiComponents,
    private localDataService: LocalDataService) {

    this.getNews();
  }

  getNews() {
    this.newsAll = this.localDataService.getNews();
    this.filterByTipo("General");
  }

  openInfoModal() {
    this.apiComponents.createAlertForInfo().then((alert: Alert) => {
      alert.present();
    });
  }

  onChangeSegment(status: number) {
    this.apiComponents.createLoading().then((loading: Loading) => {
      loading.present();
      status == 1 ? this.filterByTipo("General")
        : status == 2 ? this.filterByTipo("Asignatura")
          : this.filterByTipo("Otro");
      loading.dismiss();
    });
  }

  filterByTipo(tipo: string) {
    this.news = [];
    this.newsAll.forEach(elem => {
      elem.tipo == tipo ? this.news.push(elem) : null;
    });
    this.orderCardsByDate();
  }

  truncateText(item) {
    let truncated = item.descripcion;
    if (item.truncate && truncated.length > 180) {
      truncated = truncated.substr(0, 180) + '...';
    }
    return truncated;
  }

  changeView(item) {
    item.truncate = !item.truncate;
  }

  orderCardsByDate() {
    this.news = _.sortBy(this.news, function(o) 
    { 
      let fecha = o.fecha.split("/")[1] + "/" + o.fecha.split("/")[0] + "/" + o.fecha.split("/")[2];
      return new Date(fecha)}
    ).reverse();
  }

  ionViewDidLoad() {
    let user = this.localDataService.getUser();
    if (!user || user == null) {
      this.navCtrl.setRoot("LoginPage");
    }
    console.log("checkUser");
  }

}
