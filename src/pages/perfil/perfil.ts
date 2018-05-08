import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import { ApiComponents } from '../../components/api-components';
import { LocalDataService } from '../../app/local-data.service';
import { Comentario } from '../../app/models/comentario.model';
import _ from "underscore";

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  autor: string;
  comentario: string;
  comments: Comentario[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private apiComponents: ApiComponents,
    public localDataService: LocalDataService) {
      this.getData();
    }

  getData(){
    this.autor = this.localDataService.getUser().nombre;
    let commentsMemory = this.localDataService.getComments();
    if(commentsMemory != null){
      commentsMemory.forEach(elem => {
        this.comments.push(new Comentario(elem.texto, elem.autor, elem.fecha));
      })
      this.orderCardsBy('fecha');
    }
  }

  saveComentario(){
    if(this.comentario == "" || this.comentario == null){
      this.apiComponents.createAlertCommentEmpty().then((alert: Alert) => {
        alert.present();
      });
    }else{
      let comment = new Comentario(this.comentario, this.autor, null);
      this.comentario = "";
      this.comments.push(comment);
      this.localDataService.setComments(this.comments);
      this.orderCardsBy('fecha');
    }
  }

  orderCardsBy(attribute:string){
		this.comments=_.sortBy(this.comments,attribute).reverse();
  }

  openInfoModal(){
    this.apiComponents.createAlertForInfo().then((alert: Alert) => {
      alert.present();
    });
  }

  ionViewDidLoad() {
    let user = this.localDataService.getUser();
		if (!user || user == null) {
			this.navCtrl.setRoot("LoginPage");
		}
		console.log("checkUser");
  }

}
