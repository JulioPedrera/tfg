export class News {
    titulo: string;
    descripcion: string;
    tipo: string;
    categoria: string;
    fecha: string;
    truncate: boolean;

    constructor(elem: any){
        this.titulo = elem.title;
        this.descripcion = elem.description;
        this.tipo = elem.type;
        this.categoria = elem.category;
        this.fecha = new Date(elem.pubDate).toLocaleString();
        this.truncate = true;
    }

    setTipo(tipo: string){
        this.tipo = tipo;
    }

    setCategoria(cat: string){
        this.categoria = cat;
    }
}