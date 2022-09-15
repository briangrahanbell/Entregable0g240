let categoriesArray = [];

function showCategoriesList(array){
    
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let category = array[i];
        htmlContentToAppend += `
        <div onclick="setProID(${category.id})" class="list-group-item list-group-item-action cursor-active">
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ category.name +` - `+ category.currency +` `+ category.cost +`</h4> 
                        <p> `+ category.description +`</p> 
                        </div>
                        <small class="text-muted">` + category.soldCount + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
        document.getElementById('inicio').placeholder = category.currency;
        document.getElementById('final').placeholder = category.currency;
        document.getElementById('masCarosIcono').innerHTML = category.currency;
        document.getElementById('masBaratosIcono').innerHTML = category.currency
    }
}

function filtrar(){
    
    let inicio = document.getElementById('inicio');
    let final = document.getElementById('final');
    let faltaAlgo = document.getElementById('invalidFiltro');

    if(inicio.value === "" && final.value ===""){  
        inicio.classList.add('is-invalid');  
        faltaAlgo.innerHTML ="Ingrese los valores minimo y maximo para filtrar"
    }else if(inicio.value ===""){
        inicio.classList.add('is-invalid');
        faltaAlgo.innerHTML = "ingrese valor minimo";  
    }else if(final.value ===""){
        final.classList.add('is-invalid'); 
        faltaAlgo.innerHTML = "ingrese valor maximo"; 
    }else{
        let filtrado = categoriesArray.filter(elemento => elemento.cost >= inicio.value && elemento.cost <= final.value);
        localStorage.setItem('listaFiltrada',JSON.stringify(filtrado));
        showCategoriesList(filtrado);
        inicio.value = "";
        final.value = "";
    }
}

function ordenAscendente(){
    let miLista = [];
    miLista = JSON.parse(localStorage.getItem('listaFiltrada')); 
    if(miLista != null){
        let filtradoOrdenado = miLista.sort((ant,sig)=> ant.cost - sig.cost);    
        showCategoriesList(filtradoOrdenado);
    }else{
        let ordenSinFiltrar = categoriesArray.sort((ant,sig)=> ant.cost - sig.cost);
        showCategoriesList(ordenSinFiltrar);
    }
}

function ordenDescendente(){
    let miLista = [];
    miLista = JSON.parse(localStorage.getItem('listaFiltrada'));
    if(miLista != null){
        let filtradoOrdenado = miLista.sort((ant,sig)=> sig.cost - ant.cost);    
        showCategoriesList(filtradoOrdenado);
    }else{
        let ordenSinFiltrar = categoriesArray.sort((ant,sig)=> sig.cost - ant.cost);    
        showCategoriesList(ordenSinFiltrar);
    }

}

function masVendidos(){
    
    let miLista = [];
    miLista = JSON.parse(localStorage.getItem('listaFiltrada'));
    if(miLista != null){
        let filtradoOrdenado = miLista.sort((ant,sig)=> sig.soldCount - ant.soldCount);    
        showCategoriesList(filtradoOrdenado);
    }else{
        let ordenSinFiltrar = categoriesArray.sort((ant,sig)=> sig.soldCount - ant.soldCount);    
        showCategoriesList(ordenSinFiltrar);
    }
}
    
function setProID(id) {
    localStorage.setItem("proID", id);
    window.location = "product-info.html"
}
document.addEventListener("DOMContentLoaded", function(e){
    let cat = localStorage.getItem('catID');
    getJSONData(PRODUCTS_URL + cat + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            document.getElementById('nombreCat').innerHTML = resultObj.data.catName;
            categoriesArray = resultObj.data.products;
            showCategoriesList(categoriesArray);
        }
    
    });
    document.getElementById('filtrar').addEventListener('click', function(){
        filtrar();
    });
    document.getElementById('masBaratos').addEventListener('click', function(){
        ordenAscendente();     
    });
    document.getElementById('masCaros').addEventListener('click', function(){
        ordenDescendente();
    });
    document.getElementById('sacarFiltros').addEventListener('click',function(){
        localStorage.removeItem('listaFiltrada');
        showCategoriesList(categoriesArray);
    });
    document.getElementById('masVendidos').addEventListener('click',function(){
        masVendidos();
    });
    document.getElementById('inicio').addEventListener('keydown',function(){
        this.classList.remove('is-invalid');
    });
    document.getElementById('final').addEventListener('keydown',function(){
        this.classList.remove('is-invalid');
    });
});