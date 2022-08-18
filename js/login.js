function login(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if(email === "" && password === ""){
        document.getElementById('email').classList.add('is-invalid');
        document.getElementById('password').classList.add('is-invalid');
    }else if(email === ""){
        document.getElementById('email').classList.add('is-invalid');
    }
    else if(password === ""){
        document.getElementById('password').classList.add('is-invalid');
    }else{
        localStorage.setItem('user',email);
        location.href="index.html";
    }
}

document.addEventListener('DOMContentLoaded',()=> {
    document.getElementById('regBtn').addEventListener('click', () => {
        login();
    })
})
