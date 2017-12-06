import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import { ApiComponents } from '../../components/api-components';
import { User } from '../../app/models/user.model';
import { Chart } from 'chart.js';
import { News } from '../../app/models/news.model';
import { Profesor } from '../../app/models/profesor.model';
import { LocalDataService } from '../../app/local-data.service';

/**
 * Generated class for the GraphsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-graphs',
  templateUrl: 'graphs.html',
})
export class GraphsPage {

  @ViewChild('canvasNews') canvasNews;
  @ViewChild('canvasProfes') canvasProfes;

  news: News[];
  profs: Profesor[];
  newsLabels: string[] = ["General", "Asignatura", "Máster ITS", "Doctorado"];
  newsNumbers: number[] = [0,0,0,0];
  profsLabels: string[] = ["Módulo F-PB", "Módulo F-1P", "Módulo I", "Módulo E"];
  profsNumbers: number[] = [0,0,0,0];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apiComponents: ApiComponents,
    private localDataService: LocalDataService) {
    this.prepareData();
  }

  openInfoModal() {
    this.apiComponents.createAlertForInfo().then((alert: Alert) => {
      alert.present();
    });
  }

  prepareData() {
    this.news = this.localDataService.getNews();
    this.profs = this.localDataService.getProfes();

    this.news.forEach(elem => {
      switch (elem.tipo) {
        case 'General':
          this.newsNumbers[0] += 1;
          break;
        case 'Asignatura':
          this.newsNumbers[1] += 1;
          break;
        case 'Doctorado':
          this.newsNumbers[3] += 1;
          break;
        default:
          this.newsNumbers[2] += 1;
      }
    });

    this.profs.forEach(elem => {
      if (elem.despacho.startsWith(" E")) {
        this.profsNumbers[3] += 1;
      } else {
        if (elem.despacho.startsWith("I")) {
          this.profsNumbers[2] += 1;
        } else {
          if (elem.despacho.startsWith("F0")) {
            this.profsNumbers[0] += 1;
          } else {
            this.profsNumbers[1] += 1;
          }
        }
      }
    })
  }

  ionViewDidLoad() {
    this.apiComponents.drawPie(this.canvasNews, this.newsLabels, this.newsNumbers);
    this.apiComponents.drawBar(this.canvasProfes, this.profsLabels, this.profsNumbers);
  }

}
