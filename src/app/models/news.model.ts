export class News {
    titulo: string;
    descripcion: string;
    tipo: string;
    categoria: string;
    fecha: Date;
    truncate: boolean;

    constructor(elem: any){
        this.titulo = elem.title;
        this.descripcion = elem.description;
        this.tipo = elem.type;
        this.categoria = elem.category;
        this.fecha = new Date(elem.pubDate);
        this.truncate = true;
    }
}