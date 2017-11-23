export class Profesor {
    nombre: string;
    despacho: string;
    telefono: string;

    constructor(){
        
    }

    setUser(profesor: any): Profesor {
        this.nombre = profesor.nombre;
        this.despacho = profesor.string;
        this.telefono = profesor.string;
        return this;
    }
}