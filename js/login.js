

function login(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let nombre = document.getElementById('nombreUsuario').value;

    if(email === "" && password === "" && nombre ===""){
        document.getElementById('email').classList.add('is-invalid');
        document.getElementById('password').classList.add('is-invalid');
        document.getElementById('nombreUsuario').classList.add('is-invalid');
    }else if(email === ""){
        document.getElementById('email').classList.add('is-invalid');
    }
    else if(password === ""){
        document.getElementById('password').classList.add('is-invalid');
    }else if(nombre ===""){
        document.getElementById('nombreUsuario').classList.add('is-invalid');
    }else{
        localStorage.setItem('user',nombre);
        location.href="index.html";
    }
}

document.addEventListener('DOMContentLoaded',()=> {
    localStorage.removeItem('user');
    document.getElementById('regBtn').addEventListener('click', () => {
        login();
    })
    document.getElementById('email').addEventListener('keydown', () =>{
        document.getElementById('email').classList.remove("is-invalid");
    })
    document.getElementById('password').addEventListener('keydown', () =>{
        document.getElementById('password').classList.remove("is-invalid");
    })
    document.getElementById('nombreUsuario').addEventListener('keydown', () =>{
        document.getElementById('nombreUsuario').classList.remove("is-invalid");
    })

})
