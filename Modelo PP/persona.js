export class Persona {
    constructor(id, nombre, apellido, edad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
    toString() {
        return `${this.id} ${this.nombre} ${this.apellido} ${this.nombre} ${this.edad}`;
    }
    toJson() {
        return JSON.stringify(this);
    }
}
export class Empleado extends Persona {
    constructor(id, nombre, apellido, edad, sueldo, ventas) {
        super(id, nombre, apellido, edad);
        this.sueldo = sueldo;
        this.ventas = ventas;
    }
}

export class Cliente extends Persona {
    constructor(id, nombre, apellido, edad, compras, telefono) {
        super(id, nombre, apellido, edad);
        this.compras = compras;
        this.telefono = telefono;
    }
}

export function toObjs(jsonArray){
    let personas = jsonArray.map((item) => {
        if (item.hasOwnProperty("ventas") && item.hasOwnProperty("sueldo")) {
            return new Empleado(item.id, item.nombre, item.apellido, item.edad, item.sueldo, item.ventas);
        } else if (item.hasOwnProperty("compras") && item.hasOwnProperty("telefono")) {
            return new Cliente(item.id, item.nombre, item.apellido, item.edad, item.compras, item.telefono);
        } else {
            return new Persona(item.id, item.nombre, item.apellido, item.edad);
        }
    });
    return personas;
}
