import { toObjs } from "./persona.js"

export class HttpHandler {
    constructor() {
        if (!this.XMLHttpRequest) {
            this.XMLHttpRequest = new XMLHttpRequest();
            this.XMLHttpRequest.addEventListener("progress", updateProgress);
            this.XMLHttpRequest.addEventListener("load", transferComplete);
            this.XMLHttpRequest.addEventListener("error", transferFailed);
            this.XMLHttpRequest.addEventListener("abort", transferCanceled);
        }
    }

    sendGetSync() {
        this.XMLHttpRequest.open("GET", GetUrl(), false);
        this.XMLHttpRequest.send();
        if (this.XMLHttpRequest.status === 200) {
            const jsonString = this.XMLHttpRequest.responseText;
            const jsonArray = JSON.parse(jsonString);
            const entidades = toObjs(jsonArray);
            return entidades;
        }
        else {
            console.log("error on sending request to the server: " + this.XMLHttpRequest.status);
        }
    }

    async sendPutAsync(body) {
        let initializer = {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(body)
        };
        fetch(GetUrl(), initializer)
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return true;
            })
            .catch(error => { 
                console.log("error" + error);
                return false; 
            });
    }

    sendPut($body) {

    }


    // progress on transfers from the server to the client (downloads)
}
function GetUrl() {
    return "http://localhost/PersonasEmpleadosClientes.php";
}
function updateProgress(event) {
    if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        console.log("Compute progress: " + percentComplete);
    } else {
        // Unable to compute progress information since the total size is unknown
        console.log("Unable to compute progress information since the total size is unknown");
    }
}
function transferComplete(evt) {
    console.log("The transfer is complete.");
}

function transferFailed(evt) {
    console.log("An error occurred while transferring the file.");
}

function transferCanceled(evt) {
    console.log("The transfer has been canceled by the user.");
}