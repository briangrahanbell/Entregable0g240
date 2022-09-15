
function mostrarProducto(producto){
    let mostrar =` <h1>`+ producto.name +`</h1><br><hr><strong>Precio</strong><h4>`+ producto.currency +
     ` ` + producto.cost +` </h4><br><strong>Descripción</strong><h4>`+ producto.description +` </h4><br>
     </h4><br><strong>Categoria</strong><h4>`+ producto.category +` </h4><br> 
     </h4><br><strong>Cantidad de vendidos</strong><h4>`+ producto.soldCount +` </h4><br>
     <strong>Imagénes ilustrativas</strong><br><div><table><tr>`+ imagenes(producto) +`</tr></table></div><br> `;
    document.getElementById('infoProducto').innerHTML = mostrar;
}

function imagenes(producto){
    let filas = "";
    for(let i = 0; i < producto.images.length; i++){ 
        let imagen = producto.images[i];
        filas += `<td><img src="` + imagen + `" alt="200px" width =200px></td>`;
    }
    return filas;
}

function mostrarComentarios(comentarios){
    let filas ="";
    for(let i =0; i < comentarios.length; i++){
        let comentario = comentarios[i];
        filas +=`<hr><h4><strong>` + comentario.user + `</strong> - `+ comentario.dateTime +`-`+ puntuacion(comentario.score)
         + `(`+ comentario.score +`/5)</h4><br><p>`+ comentario.description + `</p>`;
    }
    document.getElementById('infoComentarios').innerHTML = `<br><h1>Comentarios<h1>`+ filas + `<hr>`;
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
});
