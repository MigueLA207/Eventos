let usuarios = [
    {
        nombre: "Juan jose",
        apellido: "Hernandez",
        correo: "robin@gmail.com",
        contraseña: "jrobin123"
    }
];

localStorage.setItem("usuarios", JSON.stringify(usuarios));

const login = document.getElementById("logIn");
login.addEventListener("click", auth);

function auth(e) {
    e.preventDefault(); 

    let email = document.getElementById('email');
    let password = document.getElementById('password');

    if (email && password) {
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        let buscarUsuario = usuarios.find(u =>
            u.correo === email.value && u.contraseña === password.value
        );

        if (buscarUsuario) {
            console.log("inicio exitoso");
            email.classList.add("is-valid");
            password.classList.add("is-valid");
            sessionStorage.setItem("auth", "true"); // ✅ Guarda como string "true"
            sessionStorage.setItem("nombreUsuario", buscarUsuario.nombre);
            sessionStorage.setItem("apellidoUsuario", buscarUsuario.apellido);
            window.location = "./../../statistics.html";
        } else {
            console.log("Correo o contraseña incorrectos");
            email.classList.add("is-invalid");
            password.classList.add("is-invalid");
        }
    } else {
        console.log("faltan campos");
    }
}


