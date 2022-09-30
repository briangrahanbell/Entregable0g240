
function mostrarProducto(producto){
    let mostrar =` <h1>`+ producto.name +`</h1><br>
    <hr><strong>Precio</strong><h4>`+ producto.currency +` ` + producto.cost +` </h4><br>
    <strong>Descripción</strong><h4>`+ producto.description +` </h4><br>
    <br><strong>Categoria</strong><h4>`+ producto.category +` </h4><br> 
    <br><strong>Cantidad de vendidos</strong><h4>`+ producto.soldCount +` </h4><br>
    <strong>Imagénes ilustrativas</strong><br>
    <div>
        <table>
        <tr>`+ imagenes(producto) +`</tr>
        </table>
    </div><br> `;
    document.getElementById('infoProducto').innerHTML = mostrar;
}

function showRelacionados(array){
    
    let proID = localStorage.getItem('proID');
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let category = array[i];
        if(category.id != proID){
            htmlContentToAppend += `
        <div onclick="setProID(${category.id})" class="list-group-item list-group-item-action cursor-active">
            <img src="` + category.image + `" alt="200px" width="200px"><br>
            <h4>`+ category.name + `</h4>
        </div>`
        document.getElementById("otrosProductos").innerHTML = htmlContentToAppend;
        } 
    }
}

function setProID(id) {
    localStorage.setItem("proID", id);
    window.location = "product-info.html"
}

function imagenes(producto){
    let filas = "";
    for(let i = 0; i < producto.images.length; i++){ 
        let imagen = producto.images[i];
        filas += `<td><img src="` + imagen + `" alt="200px" width="200px"></td>`;
    }
    return filas;
}

function mostrarComentarios(comentarios){
    let filas ="";
    for(let i =0; i < comentarios.length; i++){
        let comentario = comentarios[i];
        filas +=`<hr><h4><strong>` + comentario.user + `</strong> - `+ comentario.dateTime +`-`+ puntuacion(comentario.score)
         + `</h4><br><p>`+ comentario.description + `</p>`;
    }
    document.getElementById('infoComentarios').innerHTML = `<br><h1>Comentarios<h1>`+ filas + `<hr>`;
}


function agregarComentario(){
    let description = document.getElementById('comentario').value;
    let user = localStorage.getItem('user');
    let dateTime = tomarDateTime();
    let puntos =  document.getElementById('miSelect').value;
    
    let filas = `<h4><strong>` + user + `</strong> -` + dateTime + `-`+ puntuacion(puntos) +`<br>
    <p>`+ description + `</p><hr>`;
    document.getElementById('nuevosComentarios').innerHTML = filas;
}

function tomarDateTime(){

let today = new Date(),
        day = today.getDate(),
        month = today.getMonth() + 1,
        year = today.getFullYear(),
        hour = today.getHours(),
        minutes = today.getMinutes(),
        seconds = today.getSeconds();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    let actualDate = (`${year}-${month}-${day} ${hour}:${minutes}:${seconds}`);
    return actualDate;
}

function puntuacion(puntos){
    let estrellas='';
    for(let i = 1; i <= 5 ; i++){
        if(i<=puntos){
            estrellas +=`<img src="/img/estrellaPuntos.png" width= 20>`;
        }
    }
    return estrellas;
}

document.addEventListener("DOMContentLoaded", function(e){
    let proID = localStorage.getItem('proID');
    getJSONData(PRODUCT_INFO_URL + proID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            mostrarProducto(resultObj.data);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL + proID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            mostrarComentarios(resultObj.data);
        }
    });
    let cat = localStorage.getItem('catID');
    getJSONData(PRODUCTS_URL + cat + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            showRelacionados(resultObj.data.products);
        }
    
    });
    document.getElementById('btnEnviar').addEventListener('click',()=>{
        agregarComentario();
        
    });
});
