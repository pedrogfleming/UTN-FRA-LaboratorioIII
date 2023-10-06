import { crearTabla, agregarManejadorTR } from "./tablaDinamica.js";
import crearForm2 from "./formHelper.js";
import { toObjs } from "./persona.js"

let divTabla;
let formDatos;


export function inicializarManejadores() {
    const LS_Personas = localStorage.getObj("personas");
    divTabla = document.getElementById('divTabla');
    formDatos = document.getElementById('formDatos');
   
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
    divTabla.appendChild(crearTabla(personas));

    const botonAgregar = document.createElement('button');
    botonAgregar.innerHTML = "Agregar";
    botonAgregar.addEventListener('click', () => {
        crearForm(formDatos,null);
    });
}

export function vaciarElemento(elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

function manejadorEventoFilas(filas) {
    const LS_Personas = toObjs(localStorage.getObj("personas"));
    filas.forEach((fila) => {
        fila.addEventListener('click', () => {
            let idFila = fila.id;
            console.log(idFila);
            let obj = LS_Personas.find((persona) => persona.id == idFila); 
            crearForm2(formDatos,obj);
        });
    })
}