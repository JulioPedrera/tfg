export class Comentario {

    texto: string;
    autor: string;
    fecha: Date;

    constructor(texto: string, autor: string, fecha: Date){
        this.texto = texto;
        this.autor = autor;
        this.fecha = fecha ? new Date(fecha) : new Date();
    }
}