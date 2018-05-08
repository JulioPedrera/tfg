import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LocalDataService } from '../local-data.service';
import { News } from '../models/news.model';
import { Profesor } from '../models/profesor.model';
import X2JS from 'x2js';
import 'rxjs/add/operator/toPromise';
import { parse } from 'himalaya';
import 'rxjs/add/operator/map'

@Injectable()
export class ServiceWS {

    constructor(
        private http: Http,
        public localDataService: LocalDataService
    ) {
    }

    public makeRequestNews(): Promise<any> {
        let news: News[] = [];
        return this.http
            .get("http://www.lsi.us.es/rss.xml")
            .toPromise()
            .then((response: any) => {
                let parser: any = new X2JS();
                let json = parser.xml2js(response._body);
                json.rss.channel.item.forEach(element => {
                    let newsAux = new News(element);
                    if(element.type == "Máster ITS" || element.type == "Doctorado"){
                        newsAux.setTipo("Otro");
                    }
                    news.push(new News(element));
                });
                //this.localDataService.setNews(news);

                return Promise.resolve(news);
            })
            .catch((response: any) => {
                return Promise.reject(null);
            });
    }

    public makeRequestNewsTfg(): Promise<any> {
        let news: News[] = [];
        return this.http
            .get("http://www.lsi.us.es/rss/tfg.xml")
            .toPromise()
            .then((response: any) => {
                let parser: any = new X2JS();
                let json = parser.xml2js(response._body);
                json.rss.channel.item.forEach(element => {
                    let newsAux = new News(element);
                    newsAux.setCategoria("TFG");
                    newsAux.setTipo("Otro");
                    news.push(newsAux);
                });
                return Promise.resolve(news);
            })
            .catch((response: any) => {
                return Promise.reject(null);
            });
    }

    public makeRequestNewsTfm(): Promise<any> {
        let news: News[] = [];
        return this.http
            .get("http://www.lsi.us.es/rss/tfm.xml")
            .toPromise()
            .then((response: any) => {
                let parser: any = new X2JS();
                let json = parser.xml2js(response._body);
                json.rss.channel.item.forEach(element => {
                    let newsAux = new News(element);
                    newsAux.setCategoria("TFM");
                    newsAux.setTipo("Otro");
                    news.push(newsAux);
                });
                return Promise.resolve(news);
            })
            .catch((response: any) => {
                return Promise.reject(null);
            });
    }

    public makeRequestNewsPgpi(): Promise<any> {
        let news: News[] = [];
        return this.http
            .get("http://www.lsi.us.es/rss/pgpi.xml")
            .toPromise()
            .then((response: any) => {
                let parser: any = new X2JS();
                let json = parser.xml2js(response._body);
                json.rss.channel.item.forEach(element => {
                    let newsAux = new News(element);
                    newsAux.setCategoria("PGPI");
                    newsAux.setTipo("Asignatura");
                    news.push(newsAux);
                });
                return Promise.resolve(news);
            })
            .catch((response: any) => {
                return Promise.reject(null);
            });
    }

    public makeRequestNewsIr(): Promise<any> {
        let news: News[] = [];
        return this.http
            .get("http://www.lsi.us.es/rss/ir.xml")
            .toPromise()
            .then((response: any) => {
                let parser: any = new X2JS();
                let json = parser.xml2js(response._body);
                json.rss.channel.item.forEach(element => {
                    let newsAux = new News(element);
                    newsAux.setCategoria("IR");
                    newsAux.setTipo("Asignatura");
                    news.push(newsAux);
                });
                return Promise.resolve(news);
            })
            .catch((response: any) => {
                return Promise.reject(null);
            });
    }

    public makeRequestNewsIissi(): Promise<any> {
        let news: News[] = [];
        return this.http
            .get("http://www.lsi.us.es/rss/psg.xml")
            .toPromise()
            .then((response: any) => {
                let parser: any = new X2JS();
                let json = parser.xml2js(response._body);
                json.rss.channel.item.forEach(element => {
                    let newsAux = new News(element);
                    newsAux.setCategoria("IISSI");
                    newsAux.setTipo("Asignatura");
                    news.push(newsAux);
                });
                return Promise.resolve(news);
            })
            .catch((response: any) => {
                return Promise.reject(null);
            });
    }

    public makeRequestNewsPsg(): Promise<any> {
        let news: News[] = [];
        return this.http
            .get("http://www.lsi.us.es/rss/psg.xml")
            .toPromise()
            .then((response: any) => {
                let parser: any = new X2JS();
                let json = parser.xml2js(response._body);
                json.rss.channel.item.forEach(element => {
                    let newsAux = new News(element);
                    newsAux.setCategoria("PSG");
                    newsAux.setTipo("Asignatura");
                    news.push(newsAux);
                });
                return Promise.resolve(news);
            })
            .catch((response: any) => {
                return Promise.reject(null);
            });
    }

    public makeRequestProfes(): Promise<any> {
        let profs: Profesor[] = [];
        return this.http
            .get("http://www.lsi.us.es/personal/personal2.php?tipo=1")
            .toPromise()
            .then((response: any) => {
                let body = response._body;
                const json = parse(body);
                let listaProfes = json[1].children[3].children[1].children[7].children[1]
                    .children[3].children[1].children;

                listaProfes.forEach(elem => {
                    if (elem.tagName && elem.tagName == "tr" && elem.children[1].tagName == "td") {
                        let nombre = elem.children[1].children[0].children[0].content;
                        let despacho = elem.children[3].children[0].content;
                        let telefono = elem.children[5].children[0].content;
                        let link = "http://www.lsi.us.es/personal/" + elem.children[1]
                            .children[0].attributes[0].value;
                        profs.push(new Profesor(nombre, despacho, telefono, link));
                    }
                });
                this.localDataService.setProfes(profs);

                return Promise.resolve(profs);
            })
            .catch((response: any) => {
                return Promise.reject(null);
            });
    }

    public getProfesJson() {
        let profs: Profesor[] = [];
        return this.http.get("assets/data/profesores.json")
        .toPromise()
        .then((response: any) => {
            let body: string = response._body;
            const json = JSON.parse(body);
            json.forEach(elem => {
                profs.push(new Profesor(elem.nombre, elem.despacho, elem.telefono, elem.link));
            })
            this.localDataService.setProfes(profs);
            return Promise.resolve(profs);
        })
    }
}