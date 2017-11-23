export class News {
    titulo: string;
    link: string;
    descripcion: string;
    tipo: string;
    categoria: string;
    fecha: Date;

    constructor(){
        
    }

    setNews(news: any): News {
        this.titulo = news.titulo;
        this.link = news.link;
        this.descripcion = news.descripcion;
        this.tipo = news.tipo;
        this.categoria = news.categoria;
        this.fecha = news.fecha;
        return this;
    }
}