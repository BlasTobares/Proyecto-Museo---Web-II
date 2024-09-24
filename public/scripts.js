const URL_DEPARTAMENTOS = "https://collectionapi.metmuseum.org/public/collection/v1/departments";

const URL_OBJETOS = "https://collectionapi.metmuseum.org/public/collection/v1/objects";  

const URL_OBJETO = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

const URL_SEARCH_HAS_IMAGES = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=&hasImages=true";

const URL_SEARCH = "https://collectionapi.metmuseum.org/public/collection/v1/search";

const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');

function fetchDepartamentos() {
    fetch(URL_DEPARTAMENTOS)
    .then((response) => response.json())
    .then((data) => {

    const departamentoSelect = document.getElementById("departamento");
    data.departments.forEach((departamento) => {
    const option = document.createElement("option");
    option.value = departamento.departmentId;
    option.textContent = departamento.displayName;  
    departamentoSelect.appendChild(option);  
    });    
});
}
    function fetchObjetos(objectIDs) {
        let objetosHtml = "";
        for (objectId of objectIDs) {
            fetch(URL_OBJETO + objectId)
            .then((response) => response.json())
            .then((data) => {
                objetosHtml += `<div class="objeto"> <img src="${
                    data.primaryImageSmall != ""
                    ? data.primaryImageSmall 
                    : "sinimagen.png"
                }" /> <h4 class="titulo"> ${data.title} </h4> <h6 class="cultura"> ${
                    data.culture != "" ? data.culture : "Sin cultura"
                } </h6> <h6 class="dinastia"> ${
                    data.dynasty != "" ? data.dynasty : "Sin dinastia"
                } </h6> </div>`;
            document.getElementById("grilla").innerHTML = objetosHtml;
            console.log(data.objectID);
            });
        }
    }

    fetchDepartamentos();

    fetch(URL_SEARCH_HAS_IMAGES)
    .then((response) => response.json())
    .then((data) => {
        fetchObjetos(data.objectIDs.slice(0,20));
    });

    document.getElementById("buscar").addEventListener("click", (event) => {
        event.preventDefault();
        const departamento = document.getElementById("departamento").value;
        const keyword = document.getElementById("keyword").value;
        const localizacion = document.getElementById("localizacion").value;

        const paramLocalizacion = localizacion != "" ? `&geoLocalization=${localizacion}` : "";

        console.log(URL_SEARCH + `?q=${keyword}&departmentId=${departamento}${paramLocalizacion}`)

        fetch(

            URL_SEARCH +
             `?q=${keyword}&departmentId=${departamento}${paramLocalizacion}`
        )
             .then((response) => response.json())
             .then((data) => {
                fetchObjetos(data.objectIDs.slice(0,20));

             });
    });

/*    async function traducir(titulo, cultura, dinastia) {
        const resp = await fetch('/traducir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo,
                cultura,
                dinastia
            })
        });
        if (!resp.ok) {
            throw new Error('Error al traducir');
        };
            const data = await resp.json();
            console.log(data);
            return data;
    }
*/

/*async function traducir(titulo, cultura, dinastia) { 
    try {
        const resp = await fetch('/traducir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, cultura, dinastia })
        });

        if (!resp.ok) {
            throw new Error('Error al traducir');
        }

        const data = await resp.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error('Error:', error);
    }
}
    */

/*async function traducir(texto) {
    try {
        const resp = await fetch(`/traducir/${encodeURIComponent(texto)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!resp.ok) {
            throw new Error('Error al traducir');
        }

        const data = await resp.json();
        console.log(data.traduccion); // Muestra la traducción en la consola
        return data.traduccion;

    } catch (error) {
        console.error('Error:', error);
    }
}
    */
async function translateText(text, targetLang) {
    try {
        const response = await fetch('/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text, targetLang: targetLang })
        });
        const result = await response.json();
        return result.translatedText;
    } catch (error) {
        console.error('Error al traducir el texto:', error);
        return text; // Devuelve el texto original si hay un error
    }
}

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loader.style.display = 'block'; // Mostrar el loader al cambiar de página
        displayObjects();
    }
});

nextPageBtn.addEventListener('click', () => {
    if (currentPage * itemsPerPage < totalItems) {
        currentPage++;
        loader.style.display = 'block'; // Mostrar el loader al cambiar de página
        displayObjects();
    }
});
