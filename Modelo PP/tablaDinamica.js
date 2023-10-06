function crearCabecera(row) {
    const cabecera = document.createElement("thead"),
        tr = document.createElement("tr");
    for (const key in row) {
        if (key === "id") {
            continue;
        }
        const th = document.createElement("th");
        th.textContent = key; //agarro el nombre de las propiedades del objeto y se los asigno
        tr.appendChild(th);
    }
    cabecera.appendChild(tr);
    return cabecera;
}

function crearCuerpo(data) {
    const cuerpo = document.createElement("tbody");

    data.forEach(elemento => {
        const fila = document.createElement("tr");
        for (const atributo in elemento) {
            if (atributo === "id") {
                fila.setAttribute("id", elemento[atributo]);
                continue;
            }
            const td = document.createElement("td");
            td.textContent = elemento[atributo];
            fila.appendChild(td);
            fila.classList.add("puntero");
        }

        const filas = cuerpo.children;

        for (let i = 0; i < filas.length; i++) {
            if (!(i % 2)) {
                filas[i].classList.add("gris")
            }

        }

        cuerpo.appendChild(fila);
    })


    return cuerpo;
}

export function crearTabla(data) {
    if (!Array.isArray(data)) {
        return null;
    }

    const tabla = document.createElement("table");
    tabla.setAttribute('id', 'tabla');
    tabla.appendChild(crearCabecera(data[0]));
    tabla.appendChild(crearCuerpo(data));

    return tabla;
}

export function agregarManejadorTR(tr, lista){
    if(tr){
        tr.addEventListener("click", function(e){
            
            mostrarAnuncio(
                (lista.filter((el) => el.id == e.target.parentNode.dataset.id ))[0]
            );            
        })
    }
}