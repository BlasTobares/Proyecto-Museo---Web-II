const URL_DEPARTAMENTOS = "https://collectionapi.metmuseum.org/public/collection/v1/departments";

const URL_OBJETOS = "https://collectionapi.metmuseum.org/public/collection/v1/objects";  

const URL_OBJETO = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

const URL_SEARCH_HAS_IMAGES = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=&hasImages=true";

const URL_SEARCH = "https://collectionapi.metmuseum.org/public/collection/v1/search";

let PAGE = 0;
const ITEMS_PER_PAGE = 20;


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
        let totalFetched = 0;

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
            totalFetched++;

            if (totalFetched === objectIDs.length) {
                toggleButtons();
            }
            console.log(data.objectID);
            });
        }
    }

    fetchDepartamentos();

    fetch(URL_SEARCH_HAS_IMAGES)
    .then((response) => response.json())
    .then((data) => {
        fetchObjetos(data.objectIDs.slice(PAGE*20, (PAGE + 1)*20));
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

    function fetchPage(page) {
        fetch(URL_SEARCH_HAS_IMAGES)
            .then((response) => response.json())
            .then((data) => {
                const objectIDs = data.objectIDs;
                const startIndex = page * ITEMS_PER_PAGE;
                const endIndex = startIndex + ITEMS_PER_PAGE;
                fetchObjetos(objectIDs.slice(startIndex, endIndex));
            });
    }
    
    document.getElementById("anterior").addEventListener("click", () => {
        if (PAGE > 0) {
            PAGE--;
            fetchPage(PAGE);
        }
    });
    
    document.getElementById("siguiente").addEventListener("click", () => {
        PAGE++;
        fetchPage(PAGE);
    });
    
    document.getElementById("buscar").addEventListener("click", (event) => {
        event.preventDefault();
        PAGE = 0; // Reiniciar a la primera página con la nueva búsqueda
    
        const departamento = document.getElementById("departamento").value;
        const keyword = document.getElementById("keyword").value;
        const localizacion = document.getElementById("localizacion").value;
        const paramLocalizacion = localizacion !== "" ? `&geoLocalization=${localizacion}` : "";
    
        fetch(URL_SEARCH + `?q=${keyword}&departmentId=${departamento}${paramLocalizacion}`)
            .then((response) => response.json())
            .then((data) => {
                fetchObjetos(data.objectIDs.slice(PAGE * ITEMS_PER_PAGE, (PAGE + 1) * ITEMS_PER_PAGE));
            });
    });
    
    // Inicializar con la primera página al cargar la página
    fetchPage(PAGE);








/*    async function fetchObjetos(objectIDs) {
        let objetosHtml = "";
        let totalFetched = 0;
    
        for (const objectId of objectIDs) {
            try {
                // Fetch para obtener los datos del objeto
                const response = await fetch(URL_OBJETO + objectId);
                if (!response.ok) throw new Error('Error en la red'); // Manejo de errores
    
                const data = await response.json();
    
                // Traducir título, cultura y dinastía
                const title = await translateText(data.title || 'Sin título', 'es');
                const culture = await translateText(data.culture || 'N/A', 'es');
                const dynasty = await translateText(data.dynasty || 'N/A', 'es');
    
                // Construir el HTML para cada objeto
                objetosHtml += `
                    <div class="objeto">
                        <img src="${data.primaryImageSmall !== "" ? data.primaryImageSmall : "sinimagen.png"}" />
                        <h4 class="titulo">${title}</h4>
                        <h6 class="cultura">${culture !== "" ? culture : "Sin cultura"}</h6>
                        <h6 class="dinastia">${dynasty !== "" ? dynasty : "Sin dinastía"}</h6>
                    </div>
                `;
    
                totalFetched++;
    
                // Actualiza el DOM después de cada fetch
                document.getElementById("grilla").innerHTML = objetosHtml;
    
                if (totalFetched === objectIDs.length) {
                    toggleButtons();
                }
                console.log(data.objectID);
            } catch (error) {
                console.error('Error al obtener objeto:', error);
            }
        }
    }

*/








/*    async function traducir(titulo, cultura, dinastia) {
        try {
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
            }
    
            const data = await resp.json();
            console.log(data.titulosTraducidos);  // Verifica las traducciones recibidas
    
            // Puedes utilizar las traducciones como desees en tu frontend.
            return data.titulosTraducidos;
        } catch (error) {
            console.error('Error en la traducción:', error);
        }
    }
*/
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
            
    }
/*


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

/*
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
        */