export class Profesor {
    nombre: string;
    despacho: string;
    telefono: string;
    link: string;

    constructor(nombre: string, despacho: string, telefono: string, link: string) {
        this.nombre = nombre;
        this.despacho = despacho;
        this.telefono = telefono;
        this.link = link;
        return this;
    }
}