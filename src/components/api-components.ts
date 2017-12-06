import { Injectable } from '@angular/core';
import { LoadingController, Loading, AlertController, Alert, App, MenuController } from 'ionic-angular';
import { Chart } from 'chart.js';

@Injectable()
export class ApiComponents {

    constructor(
        public loadingCtrl: LoadingController,
        private alertCtrl: AlertController, 
        private appCtrl: App,
        private menu: MenuController) { }

    createLoading(): Promise<Loading> {
        return new Promise((resolve, reject) => {
            let loading = this.loadingCtrl.create();
            resolve(loading);
        });
    }

    createAlertForInfo(): Promise<Alert> {
        return new Promise((resolve, reject) => {
            let alert = this.alertCtrl.create({
                title: 'TFG App',
                subTitle: 'Versión 1.0',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                        }
                    }
                ]
            });
            resolve(alert);
        });
    }

    createAlertLoginIncorrect(): Promise<Alert> {
        return new Promise((resolve, reject) => {
            let alert = this.alertCtrl.create({
                title: 'Usuario y/o contraseña incorrecta',
                subTitle: 'Inténtelo de nuevo o póngase en contacto con nosotros: julpinpae@us.es',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                        }
                    }
                ]
            });
            resolve(alert);
        });
    }

    createAlertCommentEmpty(): Promise<Alert> {
        return new Promise((resolve, reject) => {
            let alert = this.alertCtrl.create({
                title: 'Error al enviar',
                subTitle: 'El campo comentario no puede estar vacío',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                        }
                    }
                ]
            });
            resolve(alert);
        });
    }

    createConfirmExit(): Promise<Alert> {
        return new Promise((resolve, reject) => {
            let alert = this.alertCtrl.create({
                title: 'Cerrar sesión',
                subTitle: '¿Está seguro de que quiere salir de la aplicación?',
                buttons: [
                    {
                        text: 'CERRAR SESIÓN',
                        handler: () => {
                            this.menu.enable(false);
                            localStorage.removeItem("user")
                            this.appCtrl.getRootNav().setRoot("LoginPage");
                        }
                    },{
                        text: 'CANCELAR',
                        handler: () => {
                        }
                    }
                ]
            });
            resolve(alert);
        });
    }

    /** CHARTS */
    public drawPie(canvas: any, labels: any, data: any) {
		new Chart(canvas.nativeElement, {
			type: 'pie',
			data: {
				labels: labels,
				datasets: [{
					data: data,
					backgroundColor: [
						'#3498DB',
						'#F7DC6F',
						'#E74C3C',
						'#2ECC71',
					]
				}]
			},
			options: {
				legend: {
					display: true,
					position: 'bottom',
                    labels: {
                        usePointStyle: true
                    }
				}
			}
		});
    }
    
    public drawBar(canvas: any, labels: any, data: any) {
		new Chart(canvas.nativeElement, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [{
					data: data,
					backgroundColor: [
						'#2ECC71',
						'#F7DC6F',
						'#E74C3C',
						'#3498DB',
					]
				}]
            },
            options: {
                scales: {
                    xAxes: [{
                        gridLines: {
                            offsetGridLines: true
                        }
                    }]
                },
				legend: {
					display: false
				}
            }
		});
	}
}
