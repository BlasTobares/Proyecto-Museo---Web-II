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


// FUNCION QUE FUNCIONA SIN TRADUCCION TODAVIA
function fetchObjetos(objectIDs) {
    let objetosHtml = "";
    let totalFetched = 0;

    for (let objectId of objectIDs) {
        fetch(URL_OBJETO + objectId)
            .then((response) => response.json())
            .then((data) => {

                // Verificar si hay imágenes adicionales
                let additionalImagesHtml = '';
                if (data.additionalImages && data.additionalImages.length > 0) {
                    additionalImagesHtml = `<button onclick="verMasImagenes(${objectId})">Ver más imágenes</button>`;
                }

                // Construir el HTML de cada objeto
                objetosHtml += `
                <div class="objeto">
                    <img src="${
                        data.primaryImageSmall != "" ? data.primaryImageSmall : "sinimagen.png"
                    }" />
                    <h4 class="titulo">${data.title}</h4>
                    <h6 class="cultura">${data.culture != "" ? data.culture : "Sin cultura"}</h6>
                    <h6 class="dinastia">${data.dynasty != "" ? data.dynasty : "Sin dinastia"}</h6>
                    ${additionalImagesHtml}
                </div>`;

                // Actualizar el contenido de la grilla
                document.getElementById("grilla").innerHTML = objetosHtml;
                totalFetched++;

                if (totalFetched === objectIDs.length) {
                    toggleButtons();
                }
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

    function verMasImagenes(objectId) {
        const modal = document.getElementById("imageModal");
        const modalImages = document.getElementById("modal-images");
    
        // Limpiar el contenido anterior del modal
        modalImages.innerHTML = "";
    
        // Fetch para obtener las imágenes adicionales del objeto
        fetch(URL_OBJETO + objectId)
            .then((response) => response.json())
            .then((data) => {
                if (data.additionalImages && data.additionalImages.length > 0) {
                    data.additionalImages.forEach((imageUrl) => {
                        const imgElement = document.createElement("img");
                        imgElement.src = imageUrl;
                        modalImages.appendChild(imgElement);
                    });
                } else {
                    modalImages.innerHTML = "<p>No hay imágenes adicionales disponibles.</p>";
                }
    
                // Mostrar el modal
                modal.style.display = "block";
            });
    }
    
    // Código para cerrar el modal
    const modal = document.getElementById("imageModal");
    const closeBtn = document.getElementsByClassName("close")[0];
    
    // Cerrar el modal cuando se haga clic en la "x"
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };
    
    // Cerrar el modal cuando se haga clic fuera del contenido del modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };