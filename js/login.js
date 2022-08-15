function login(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if(email === ""){
        alert("ingrese su email");
    }else if(password === ""){
        alert("ingrese su contraseña");
    }else{
        sessionStorage.setItem('user',email);
        location.href="index.html";
    }
}

document.addEventListener('DOMContentLoaded',()=> {
    document.getElementById('regBtn').addEventListener('click', () => {
        login();
    })
})
