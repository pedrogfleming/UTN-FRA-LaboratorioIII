import { crearTabla, agregarManejadorTR } from "./tablaDinamica.js";
import crearForm from "./formHelper.js";
import { toObjs } from "./persona.js"

let divTabla;
let formDatos;
let complementosTabla;

export function inicializarManejadores() {
    const LS_Personas = localStorage.getObj("personas");
    divTabla = document.getElementById('divTabla');
    formDatos = document.getElementById('formDatos');
    complementosTabla = document.getElementById('complements');
    actualizarTabla(LS_Personas);
    const filas = document.querySelectorAll('tr');
    manejadorEventoFilas(filas);

    document.addEventListener('refrescarTablaPersonas', (event) => {
        const LS_Personas = event.detail;
        vaciarElemento(formDatos);
        actualizarTabla(LS_Personas);
        const filas = document.querySelectorAll('tr');
        manejadorEventoFilas(filas);    
    });
}

export function actualizarTabla(personas) {
    vaciarElemento(divTabla);
    crearCheckboxs();
    divTabla.appendChild(crearTabla(personas));

    const botonAgregar = document.createElement('button');
    botonAgregar.innerHTML = "Agregar";
    botonAgregar.addEventListener('click', () => {
        crearForm(formDatos,null);
    });
    divTabla.appendChild(botonAgregar);
}

function manejadorEventoFilas(filas) {
    const LS_Personas = toObjs(localStorage.getObj("personas"));
    filas.forEach((fila) => {
        fila.addEventListener('click', () => {
            let idFila = fila.id;
            console.log(idFila);
            let obj = LS_Personas.find((persona) => persona.id == idFila);
            vaciarElemento(formDatos);
            crearForm(formDatos,obj);
        });
    })
}

export function vaciarElemento(elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

function crearCheckboxs(){

    let LS_Personas = localStorage.getObj("personas");
    let auxProps = Object.getOwnPropertyNames(LS_Personas[0]);
    let checks = [];
    auxProps.forEach((p) => {
        let chbox = document.createElement("input");
        let lbchbox = document.createElement("label");

        chbox.type = "checkbox";
        chbox.name = p;
        chbox.id = p;
        
        lbchbox.innerHTML = p;


        chbox.addEventListener("checked", (e) => {
            console.log(e.checked);
        })

        complementosTabla.appendChild(chbox);
        complementosTabla.appendChild(lbchbox);
    });
}