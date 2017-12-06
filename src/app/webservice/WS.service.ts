import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LocalDataService } from '../local-data.service';
import { News } from '../models/news.model';
import { Profesor } from '../models/profesor.model';
import X2JS from 'x2js';
import 'rxjs/add/operator/toPromise';
import { parse } from 'himalaya';

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
                    news.push(new News(element));
                });
                this.localDataService.setNews(news);

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
                    if(elem.tagName && elem.tagName == "tr" && elem.children[1].tagName == "td"){
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
}