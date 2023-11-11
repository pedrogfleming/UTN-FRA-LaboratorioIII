import { Persona, Empleado, Cliente, toObjs } from "./persona.js"
import Arr_Update from "./arrayHelpers.js"

function crearPropiedad(innerText, value) {
    const nuevoLabel = document.createElement('label');
    const nuevoInput = document.createElement("input");
    nuevoLabel.innerText = innerText;
    nuevoInput.value = value;
    nuevoInput.id = innerText;
    return { nuevoLabel, nuevoInput };
}

export default function crearForm(formulario, obj) {
    let elementos = [];
    let opciones = ["Cliente", "Empleado"];
    const selectorTipo = document.createElement("select");       

    
    for (var i = 0; i < opciones.length; i++) {
        var option = document.createElement("option");
        option.value = opciones[i];
        option.text = opciones[i];
        selectorTipo.appendChild(option);
        selectorTipo.addEventListener("change", (event) => {
            if (event.target.value === "Cliente") {
                obj = new Cliente("","","","","","");
            }
            else if (event.target.value === "Empleado") {
                obj = new Empleado("","","","","","");
            }
            let auxProps = Object.getOwnPropertyNames(obj);
            //Filtro solo por los elementos de la clase especifica no heredados
            auxProps = auxProps.filter(p => !props.includes(p));
            console.log(auxProps);
            auxProps.forEach(p => {
                let nuevosCampos = crearPropiedad(p, obj[p]);
                formulario.appendChild(nuevosCampos.nuevoLabel);
                formulario.appendChild(nuevosCampos.nuevoLabel);
            });
        });
    }
    elementos.push(selectorTipo);
    if(obj === null){
        obj = new Persona("","","","");
    }

    const props = Object.getOwnPropertyNames(obj);
    props.forEach(p => {
        let ret = crearPropiedad(p, obj[p]);
        elementos.push(ret.nuevoLabel);
        elementos.push(ret.nuevoInput);
    });

    const botonGuardar = document.createElement('button');
    botonGuardar.innerText = "Guardar";
    elementos.push(botonGuardar);

    botonGuardar.addEventListener('click', () => {
        let inputs = [];
        props.forEach(p => {
            let input = document.getElementById(p);
            inputs[p] = input.value;
        });
    
        let objModificado = null;

        if (obj instanceof Cliente) {
            objModificado = new Cliente(obj.id, inputs["nombre"], inputs["apellido"], inputs["edad"], inputs["compras"], inputs["telefono"]);
        }
        else if (obj instanceof Empleado) {
            objModificado = new Empleado(obj.id, inputs["nombre"], inputs["apellido"], inputs["edad"], inputs["sueldo"], inputs["ventas"]);
        }
        if (objModificado) {
            let LS_personas = toObjs(localStorage.getObj("personas"));
            Arr_Update(LS_personas, obj, objModificado);
            localStorage.removeItem("personas");
            localStorage.setObj("personas", LS_personas);

            const event = new CustomEvent('refrescarTablaPersonas', { detail: LS_personas });
            document.dispatchEvent(event);
        }
    });
    
    elementos.forEach((e) => formulario.appendChild(e));
}



export function crearFormViejo(formulario, obj) {
    let elementos = [];
    if(obj === null){
        obj = new Persona("","","","");

        var opciones = ["Cliente", "Empleado"];
        const selectorTipo = document.createElement("select");       

        //Create and append the options
        for (var i = 0; i < opciones.length; i++) {
            var option = document.createElement("option");
            option.value = opciones[i];
            option.text = opciones[i];
            selectorTipo.appendChild(option);
        }
        
        selectorTipo.addEventListener("change", (event) => {
            if (event.target.value === "Cliente") {
                obj = new Cliente("","","","","","");
            }
            else if (event.target.value === "Empleado") {
                obj = new Empleado("","","","","","");
            }
        });

        elementos.push(selectorTipo);
    }

    const props = Object.getOwnPropertyNames(obj);
    props.forEach(p => {
        let ret = crearPropiedad(p, obj[p]);
        elementos.push(ret.nuevoLabel);
        elementos.push(ret.nuevoInput);
    });

    const botonGuardar = document.createElement('button');
    botonGuardar.innerText = "Guardar";
    elementos.push(botonGuardar);

    botonGuardar.addEventListener('click', () => {
        let inputs = [];
        props.forEach(p => {
            let input = document.getElementById(p);
            inputs[p] = input.value;
        });
    
        let objModificado = null;

        if (obj instanceof Cliente) {
            objModificado = new Cliente(obj.id, inputs["nombre"], inputs["apellido"], inputs["edad"], inputs["compras"], inputs["telefono"]);
        }
        else if (obj instanceof Empleado) {
            objModificado = new Empleado(obj.id, inputs["nombre"], inputs["apellido"], inputs["edad"], inputs["sueldo"], inputs["ventas"]);
        }
        else{

        }
        if (objModificado) {
            let LS_personas = toObjs(localStorage.getObj("personas"));
            Arr_Update(LS_personas, obj, objModificado);
            localStorage.removeItem("personas");
            localStorage.setObj("personas", LS_personas);

            const event = new CustomEvent('refrescarTablaPersonas', { detail: LS_personas });
            document.dispatchEvent(event);
        }
    });
    elementos.forEach((e) => formulario.appendChild(e));
}