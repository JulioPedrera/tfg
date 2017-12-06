import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { News } from './models/news.model';
import { Profesor } from './models/profesor.model';
import { Comentario } from './models/comentario.model';

@Injectable()
export class LocalDataService {

    private user = 'user';
    private news = 'news';
    private profes = 'profes';
    private comments = 'comments';

    /** USER */
    getUser(): User {
        return JSON.parse(localStorage.getItem(this.user)) as User;
    }

    setUser(user: User): void {
        localStorage.setItem(this.user, JSON.stringify(user));
    }

    /** NEWS */
    getNews(): News[] {
        return JSON.parse(localStorage.getItem(this.news)) as News[];
    }

    setNews(news: News[]): void {
        localStorage.setItem(this.news, JSON.stringify(news));
    }

    /** PROFESORES */
    getProfes(): Profesor[] {
        return JSON.parse(localStorage.getItem(this.profes)) as Profesor[];
    }

    setProfes(profes: Profesor[]): void {
        localStorage.setItem(this.profes, JSON.stringify(profes));
    }

    /** COMENTARIOS */
    getComments(): Comentario[] {
        return JSON.parse(localStorage.getItem(this.comments)) as Comentario[];
    }

    setComments(comments: Comentario[]): void {
        localStorage.setItem(this.comments, JSON.stringify(comments));
    }
    
}

