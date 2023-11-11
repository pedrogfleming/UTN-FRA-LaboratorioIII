import { crearTabla } from "./tablaDinamica.js";
import { crearFormUpdate, crearFormAlta, crearSelector } from "./formHelper.js";
import { toObjs } from "./persona.js"
import { Arr_GetAllUniqueProps } from "./arrayHelper.js"

let divTabla;
let formDatos;
let dataOut = document.getElementById("dataOut");
const entidades = "personas";

export function inicializarManejadores() {
    const LS_Personas = localStorage.getObj(entidades);
    divTabla = document.getElementById('divTabla');
    formDatos = document.getElementById('formDatos');

    actualizarTabla(LS_Personas);
    // TODO tienen que ser botones
    const filas = document.querySelectorAll('tr');
    manejadorEventoFilas(filas);

    document.addEventListener('refrescarTablaPersonas', (event) => {
        const LS_Personas = localStorage.getObj(entidades);
        vaciarElemento(formDatos);
        // TODO llamar a la api con get
        actualizarTabla(LS_Personas);
        // TODO tienen que ser botones
        const filas = document.querySelectorAll('tr');
        manejadorEventoFilas(filas);
        dataOut.style.display = "block";
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
        dataOut.style.display = "none";
        dataIn.style.display = "block";
        crearFormAlta(formDatos);
    });
    divTabla.appendChild(botonAgregar);

    // TODO Agregar boton eliminar en cada fila

    // const botonEliminar = document.createElement('button');
    // botonEliminar.innerText = "Eliminar";
    // elementos.push(botonEliminar);
    // botonEliminar.addEventListener('click', () =>{
    //     let LS_Personas = toObjs(localStorage.getObj(entidades));

    //     LS_Personas = LS_Personas.filter((elemento) => elemento.id !== obj.id);

    //     localStorage.removeItem(entidades);
    //     localStorage.setObj(entidades, LS_Personas);

    //     const eventRefrescar = new CustomEvent('refrescarTablaPersonas');
    //     document.dispatchEvent(eventRefrescar);
    // });
    // TODO Agregar boton modificar en cada fila
}

function manejadorEventoFilas(filas) {
    const LS_Personas = toObjs(localStorage.getObj(entidades));
    filas.forEach((fila) => {
        //Evitamos asignar el evento al header
        if(fila.classList.value != "cabecera"){
            // OnClick para modificar la la entidad de la fila
            fila.addEventListener('click', () => {
                let idFila = fila.id;
                let obj = LS_Personas.find((persona) => persona.id == idFila);
                vaciarElemento(formDatos);
                GenerarVista("form");
                crearFormUpdate(formDatos, obj);
            });
        }
    })
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