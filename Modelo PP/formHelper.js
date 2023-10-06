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

export default function crearForm2(formulario, obj, actionRefresh) {
    const props = Object.getOwnPropertyNames(obj);
    let elementos = [];
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
            // vaciarElemento(formulario);
            // inicializarManejadores();

        }
    });

    elementos.forEach((e) => formulario.appendChild(e));

    // vaciarElemento(formulario);

    // let inputSueldo = null;
    // let inputVentas = null;
    // let inputTelefono = null;
    // let inputCompras = null;

    // let elementos = [];
    // if(obj){
    //     let ret = crearPropiedad("Id", obj.id);
    //     elementos.push(ret.nuevoLabel);
    //     elementos.push(ret.nuevoInput);

    //     obj.hasOwnProperty()

    //     ret = crearPropiedad("Nombre", obj.nombre);
    //     elementos.push(ret.nuevoLabel);
    //     elementos.push(ret.nuevoInput);


    // const labelId = document.createElement('label');
    // const inputId = document.createElement("input");
    // labelId.innerText = "Id";
    // inputId.value = obj.id;
    // elementos.push(labelId);
    // elementos.push(inputId);

    // const labelNombre = document.createElement('label');
    // const inputNombre = document.createElement("input");
    // labelNombre.innerText = "Nombre";
    // inputNombre.value = obj.nombre;
    // elementos.push(labelNombre);
    // elementos.push(inputNombre);
    // const labelApellido = document.createElement('label');
    // const inputApellido = document.createElement("input");
    // labelApellido.innerText = "Apellido";
    // inputApellido.value = obj.apellido;
    // elementos.push(labelApellido);
    // elementos.push(inputApellido);
    // const labelEdad = document.createElement('label');
    // const inputEdad = document.createElement("input");    
    // labelEdad.innerText = "Edad";
    // inputEdad.value = obj.edad;
    // elementos.push(labelEdad);
    // elementos.push(inputEdad);
    // if (obj instanceof Cliente) {
    //     const labelCompras = document.createElement('label');
    //     inputCompras = document.createElement("input");    
    //     labelCompras.innerText = "Compras";
    //     inputCompras.value = obj.compras;

    //     const labelTelefono = document.createElement('label');
    //     inputTelefono = document.createElement("input");    
    //     labelTelefono.innerText = "Telefono";
    //     inputTelefono.value = obj.telefono;

    //     elementos.push(labelCompras);
    //     elementos.push(inputCompras);
    //     elementos.push(labelTelefono);
    //     elementos.push(inputTelefono);
    // }
    // else if(obj instanceof Empleado){
    //     const labelSueldo = document.createElement('label');
    //     inputSueldo = document.createElement("input");    
    //     labelSueldo.innerText = "Sueldo";
    //     inputSueldo.value = obj.sueldo;

    //     const labelVentas = document.createElement('label');
    //     inputVentas = document.createElement("input");    
    //     labelVentas.innerText = "Ventas";
    //     inputVentas.value = obj.ventas;

    //     elementos.push(labelSueldo);
    //     elementos.push(inputSueldo);
    //     elementos.push(labelVentas);
    //     elementos.push(inputVentas);
    // }
    // }
    // const botonGuardar = document.createElement('button');
    // botonGuardar.innerText = "Guardar";
    // elementos.push(botonGuardar);


    // botonGuardar.addEventListener('click', () =>{
    //     let objModificado = null;
    //     if (obj instanceof Cliente ) {
    //         objModificado = new Cliente(obj.id, inputNombre.value, inputApellido.value, inputEdad.value,  inputCompras.value, inputTelefono.value);
    //     }
    //     else if(obj instanceof Empleado){
    //         objModificado = new Empleado(obj.id, inputNombre.value, inputApellido.value, inputEdad.value, inputSueldo.value, inputVentas.value);
    //     }
    //     if (objModificado) {
    //         Arr_Update(personas, obj, objModificado);
    //         vaciarElemento(formulario);
    //         inicializarManejadores();
    //     }
    // });

    // elementos.forEach((e) => formulario.appendChild(e));
}