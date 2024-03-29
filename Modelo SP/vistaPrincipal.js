import { crearTabla } from "./tablaDinamica.js";
import { crearFormUpdate, crearFormAlta, crearSelector, crearFormBaja } from "./formHelper.js";
import { toObjs } from "./persona.js"
import { Arr_GetAllUniqueProps } from "./arrayHelper.js"
import { crearSpinner, quitarSpinner } from "./spinnerHelper.js"
import { HttpHandler } from "./httpHandler.js";

let divTabla;
let formDatos;
let dataOut = document.getElementById("dataOut");
const entidades = "personas";

export function inicializarManejadores() {

    const LS_Personas = localStorage.getObj(entidades);
    divTabla = document.getElementById('divTabla');
    formDatos = document.getElementById('formDatos');

    actualizarTabla(LS_Personas);    
    document.addEventListener('refrescarTablaPersonas', (event) => {
       
        const personas = localStorage.getObj(entidades);
        // TODO si la api tiene base de datos o guarda en local un array de entidades, llamar de nuevo a la api con GET

        vaciarElemento(formDatos);
        actualizarTabla(personas);
        dataOut.style.display = "block";
    });

    document.addEventListener('mostrarFormularioModificacion', (event) => {
        const LS_Personas = toObjs(localStorage.getObj(entidades));
        let idFila = event.detail;
        let obj = LS_Personas.find((persona) => persona.id == idFila);

        vaciarElemento(formDatos);
        GenerarVista("form");
        crearFormUpdate(formDatos, obj);
    });
    document.addEventListener('eliminarEntidad', (event) => {
        const LS_Personas = toObjs(localStorage.getObj(entidades));
        let idFila = event.detail;
        let obj = LS_Personas.find((persona) => persona.id == idFila);

        vaciarElemento(formDatos);
        GenerarVista("form");
        crearFormBaja(formDatos, obj);
    });
}

export function actualizarTabla(personas) {

    GenerarVista("tabla");
    vaciarElemento(divTabla);

    let props = Arr_GetAllUniqueProps(personas);

    divTabla.appendChild(crearTabla(props ,personas));

    const botonAgregar = document.createElement('button');
    botonAgregar.innerHTML = "Agregar Elemento";
    botonAgregar.addEventListener('click', () => {
        GenerarVista("form");
        crearFormAlta(formDatos);
    });
    divTabla.appendChild(botonAgregar);
}



export function vaciarElemento(elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

function GenerarVista(mostrar) {
    if (mostrar == "form") {
        dataOut.style.display = "none";
        dataIn.style.display = "block";
    }
    else if (mostrar == "tabla") {
        dataIn.style.display = "none";
        dataOut.style.display = "inline-flex";
        dataOut.flexDirection = "column";
    }

}