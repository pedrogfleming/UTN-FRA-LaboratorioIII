import { toObjs } from "./persona.js"
import { inicializarManejadores, actualizarTabla, vaciarElemento } from "./vistaPrincipal.js";

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

const jsonString = `[{"id":1, "nombre":"Marcelo", "apellido":"Luque", "edad":45, "ventas":15000, "sueldo":2000},{"id":2,
"nombre":"Ramiro", "apellido":"Escobar", "edad":35, "ventas": 6000, "sueldo": 1000},{"id":3, "nombre":"Facundo",
"apellido":"Cairo", "edad":30, "ventas":500, "sueldo":15000},{"id":4, "nombre":"Fernando", "apellido":"Nieto",
"edad":18, "compras":8000, "telefono":"152111131"},{"id":5, "nombre":"Manuel", "apellido":"Loza", "edad":20,
"compras":50000, "telefono":"42040077"},{"id":666, "nombre":"Nicolas", "apellido":"Serrano", "edad":23,
"compras":7000, "telefono":"1813181563"}]`;



const jsonArray = JSON.parse(jsonString);

const personas = toObjs(jsonArray);
localStorage.setObj("personas", personas);



window.addEventListener('load', inicializarManejadores);