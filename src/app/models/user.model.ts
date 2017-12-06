export class User {
    nombre: string;
    pass: string;

    constructor(){
    }

    setUser(input: any): User {
        this.nombre = input.nombre;
        this.pass = input.pass;
        return this;
    }

    setName(name: string) {
        this.nombre = name;
    }

    setPassword(pass: string) {
        this.pass = pass;
    }
}