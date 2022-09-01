let categoriesArray = [];

function showCategoriesList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let category = array[i];
        htmlContentToAppend += `
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
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }
}

function filtrar(){
    
    let inicio = document.getElementById('inicio');
    let final = document.getElementById('final');
    
    let filtrado = categoriesArray.filter(elemento => elemento.cost >= inicio.value && elemento.cost <= final.value);
    showCategoriesList(filtrado);


}

function ordenAscendente(){
    
    let filtrado = categoriesArray.sort((ant,sig)=> ant.cost - sig.cost);
    showCategoriesList(filtrado);
}

function ordenDescendente(){
    let filtrado = categoriesArray.sort((ant,sig)=> sig.cost - ant.cost);
    showCategoriesList(filtrado);
}

function masVendidos(){
    let filtrado = categoriesArray.sort((ant,sig)=> sig.soldCount - ant.soldCount);
    showCategoriesList(filtrado);
}
    


document.addEventListener("DOMContentLoaded", function(e){
    let cat = localStorage.getItem('catID');
    getJSONData(PRODUCTS_URL + cat + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
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
        showCategoriesList(categoriesArray);
    });
    document.getElementById('masVendidos').addEventListener('click',function(){
        masVendidos();
    })
});