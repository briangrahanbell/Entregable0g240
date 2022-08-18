function cerrar(){
        localStorage.removeItem('user');
        location.href="login.html";
}


document.addEventListener("DOMContentLoaded", function(){
    //cuando apenas ingreso 
    let usuario = localStorage.getItem("user");
    if(usuario == null) {
        alert("Es necesario leguearse");
        location.href = "login.html";
    }

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    document.getElementById("cerrarBtn").addEventListener("click", function() {
        cerrar();
    });
});