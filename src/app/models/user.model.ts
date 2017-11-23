export class User {
    nombre: string;
    pass: string;

    constructor(){
        
    }

    setUser(user: any): User {
        this.nombre = user.nombre;
        this.pass = user.pass;
        return this;
    }
}