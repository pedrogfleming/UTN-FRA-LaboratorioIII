import { toObjs } from "./persona.js"
import { inicializarManejadores} from "./vistaPrincipal.js";
import { HttpHandler } from "./httpHandler.js";

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}


const httpHandler = new HttpHandler();
const jsonString = httpHandler.sendGetSync();

const jsonArray = JSON.parse(jsonString);
const personas = toObjs(jsonArray);

localStorage.setObj("personas", personas);

window.addEventListener('load', inicializarManejadores);