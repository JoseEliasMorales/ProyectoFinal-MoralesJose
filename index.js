//Creamos una clase usuario para luego poder almacenarlos en un array de usuarios
class Usuario {
    constructor(id, usuario, password) {
        this.id = id;
        this.usuario = usuario;
        this.password = password;
    }
}

let usuarios = [];
let usuarioActivo;

//comprobamos si hay usuarios creados y activos
if (localStorage.getItem("usuarios")) {
    usuarios = JSON.parse(localStorage.getItem("usuarios"));
}
if (localStorage.getItem("usuarioActivo")) {
    usuarioActivo = localStorage.getItem("usuarioActivo");
}

//comprobamos si la sesion esta activa y si no es asi damos la opcion para iniciar sesion o crear usuario
let sesionActiva = localStorage.getItem("sesionActiva");
console.log(sesionActiva);
let inicioSesion = document.getElementById("inicioSesion");

const iniciar = () => {
    if (!sesionActiva) {
        inicioSesion.innerHTML = `  
                            <button class="sesion" id="sesion">Iniciar Sesion</button>
                            <span>ó</span>
                            <span><button class="sesion" id="crear">Crea un usuario</button></span>
                            <img class="usuario" src="img/usuario-de-perfil.png" alt="iniciar sesion">
                            `;
        let crear = document.getElementById("crear");
        crear.addEventListener("click", () => {
            crearUsuario();
        });
        let sesion = document.getElementById("sesion");
        sesion.addEventListener("click", () => {
            iniciarSesion();
        });
    } else {
        inicioSesion.innerHTML = `
                            <p>${usuarioActivo}</p>
                            <div class="dropdown-center">
                                <button class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"><img class="usuario" src="img/usuario-de-perfil.png" alt="iniciar sesion"></button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" id="cerrarSesion">Cerrar Sesion</a></li>
                                </ul>
                            </div>
                            `;
        let cerrarSesion = document.getElementById("cerrarSesion");
        cerrarSesion.addEventListener("click", () => {
            cerrar();
        });
    }
};

iniciar();

//Creamos la funcion crear usuario
function crearUsuario() {
    Swal.fire({
        title: "Crear usuario",
        html: `
            <input type="text" id="usuario" class="swal2-input" placeholder="Usuario" required>
            <input type="password" id="password" class="swal2-input" placeholder="Password" required>
            <input type="password" id="verificacion" class="swal2-input" placeholder="Repetir password" required>
            `,
        confirmButtonText: "Enviar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            verificacionCrearUsuario();
        }
    });
}

//creamos la funcion para verificar que todos los datos de creacion de usuario sean correctos
function verificacionCrearUsuario() {
    let user = document.getElementById("usuario").value;
    let pass = document.getElementById("password").value;
    let verificacion = document.getElementById("verificacion").value;
    if (pass === verificacion && user !== "") {
        const nuevoUsuario = new Usuario(usuarios.length + 1, user, pass);
        usuarios.push(nuevoUsuario);
        Swal.fire({
            title: "Usuario creado con exito",
            icon: "success",
        });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    } else if (user === "") {
        Swal.fire({
            title: "Debes ingresar un usuario",
            icon: "error",
        });
    } else if (pass !== verificacion) {
        Swal.fire({
            title: "Las contraseñas no coinciden",
            icon: "error",
        });
    }
}

//creamos la funcion Iniciar sesion
function iniciarSesion() {
    Swal.fire({
        title: "Iniciar sesion",
        html: `
            <input type="text" id="usuario" class="swal2-input" placeholder="Usuario" required>
            <input type="password" id="password" class="swal2-input" placeholder="Password" required>
            `,
        confirmButtonText: "Enviar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            verificarUsuario();
        }
    });
}

//creamos la funcion de verificar usuario y contraseña
function verificarUsuario() {
    let user = document.getElementById("usuario").value;
    let pass = document.getElementById("password").value;
    const usuario = usuarios.find((usuario) => usuario.usuario === user);
    if (usuario && usuario.password == pass) {
        Toast.fire({
            title: "Sesion iniciada con exito!",
            icon: "success",
        });
        inicioSesion.innerHTML = `
                            <p>${usuario.usuario}</p>
                            <div class="dropdown-center">
                                <button class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"><img class="usuario" src="img/usuario-de-perfil.png" alt="iniciar sesion"></button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" id="cerrarSesion">Cerrar Sesion</a></li>
                                </ul>
                            </div>
                            `;
        let cerrarSesion = document.getElementById("cerrarSesion");
        cerrarSesion.addEventListener("click", () => {
            cerrar();
        });
        sesionActiva = true;
        localStorage.setItem("sesionActiva", sesionActiva);
        usuarioActivo = usuario.usuario;
        localStorage.setItem("usuarioActivo", usuarioActivo);
    } else {
        Swal.fire({
            title: "Usuario o contraseña incorrecta",
            icon: "error",
        });
    }
}

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
});

//creamos la funcion cerrar Sesion
function cerrar() {
    sesionActiva = false;
    localStorage.setItem("sesionActiva", sesionActiva);
    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("usuarioActivo");
    iniciar();
}

const seriesPopulares = document.getElementById("seriesPopulares");
const listaSeriesPopulares = "json/series/seriesPopulares.json";
const seriesMejorValoradas = document.getElementById("seriesMejorValoradas");
const listaSeriesMejorValoradas = "json/series/seriesMejorValoradas.json";
const peliculasPopulares = document.getElementById("peliculasPopulares");
const listaPeliculasPopulares = "json/peliculas/peliculasPopulares.json";
const peliculasMejorValoradas = document.getElementById("peliculasMejorValoradas");
const listaPeliculasMejorValoradas = "json/peliculas/peliculasMejorValoradas.json";
let coleccionSeries = [];
let watchlistSeries = [];
let coleccionPeliculas = [];
let watchlistPeliculas = [];
let series = [];
let peliculas = [];
let titulos = [];

//creamos el scroll para que reaccione con el mouse
seriesPopulares.addEventListener("wheel", (event)=>{
    event.preventDefault();
    seriesPopulares.scrollLeft+= event.deltaY;
})

seriesMejorValoradas.addEventListener("wheel",(event)=>{
    event.preventDefault();
    seriesMejorValoradas.scrollLeft+=event.deltaY;
})

peliculasPopulares.addEventListener("wheel",(event)=>{
    event.preventDefault();
    peliculasPopulares.scrollLeft+=event.deltaY;
})

peliculasMejorValoradas.addEventListener("wheel",(event)=>{
    event.preventDefault();
    peliculasMejorValoradas.scrollLeft+=event.deltaY;
})

//Modificamos el DOM mostrando las series del archivo JSON
fetch(listaSeriesPopulares)
    .then((results) => results.json())
    .then((shows) => {
        shows.forEach((show) => {
            seriesPopulares.innerHTML += `<div class="cardContainer">
                                            <img  class ="portada" src='https://www.themoviedb.org/t/p/w440_and_h660_face${show.poster_path}'>
                                            <div class="containerRating">
                                                <div class="circle">
                                                    <p class="ratingAverage">${show.vote_average}</p>
                                                </div>
                                            </div>
                                            <div class="tituloShow">${show.name}</div>
                                            <div class="contenedorBtn">
                                                <button class="btnWatchlist" onclick="btnWatchlistSerie(${show.id})">Agregar a Watchlist</button>
                                                <button class="btnColeccion" onclick="btnColeccionSerie(${show.id})">Agregar a Coleccion</button>
                                            </div>
                                        </div>
                                        `;
            //Insertamos las series dentro de un nuevo array
            titulos.push(`${show.name}`);
            series.push(show);
        });
    })
    .catch((error) => console.error(error));



//Modificamos el DOM mostrando las series del archivo JSON
fetch(listaSeriesMejorValoradas)
    .then((results) => results.json())
    .then((shows) => {
        shows.forEach((show) => {
            seriesMejorValoradas.innerHTML += `<div class="cardContainer">
                                            <img  class ="portada" src='https://www.themoviedb.org/t/p/w440_and_h660_face${show.poster_path}'>
                                            <div class="containerRating">
                                                <div class="circle">
                                                    <p class="ratingAverage">${show.vote_average}</p>
                                                </div>
                                            </div>
                                            <div class="tituloShow">${show.name}</div>
                                            <div class="contenedorBtn">
                                                <button class="btnWatchlist" onclick="btnWatchlistSerie(${show.id})">Agregar a Watchlist</button>
                                                <button class="btnColeccion" onclick="btnColeccionSerie(${show.id})">Agregar a Coleccion</button>
                                            </div>                                        
                                        </div>
                                        `;
            //Insertamos las series dentro de un nuevo array
            series.push(show);
        });
    })
    .catch((error) => console.error(error));



//Modificamos el DOM mostrando las peliculas del archivo JSON
fetch(listaPeliculasPopulares)
    .then((results) => results.json())
    .then((shows) => {
        shows.forEach((show) => {
            peliculasPopulares.innerHTML += `<div class="cardContainer">
                                            <img  class ="portada" src='https://www.themoviedb.org/t/p/w440_and_h660_face${show.poster_path}'>
                                            <div class="containerRating">
                                                <div class="circle">
                                                    <p class="ratingAverage">${show.vote_average}</p>
                                                </div>
                                            </div>
                                            <div class="tituloShow">${show.title}</div>
                                            <div class="contenedorBtn">
                                                <button class="btnWatchlist" onclick="btnWatchlistPelicula(${show.id})">Agregar a Watchlist</button>
                                                <button class="btnColeccion" onclick="btnColeccionPelicula(${show.id})">Agregar a Coleccion</button>
                                            </div>
                                        </div>
                                        `;
            //Insertamos las series dentro de un nuevo array
            peliculas.push(show);
        });
    })
    .catch((error) => console.error(error));



//Modificamos el DOM mostrando las peliculas del archivo JSON
fetch(listaPeliculasMejorValoradas)
    .then((results) => results.json())
    .then((shows) => {
        shows.forEach((show) => {
            peliculasMejorValoradas.innerHTML += `<div class="cardContainer">
                                            <img  class ="portada" src='https://www.themoviedb.org/t/p/w440_and_h660_face${show.poster_path}'>
                                            <div class="containerRating">
                                                <div class="circle">
                                                    <p class="ratingAverage">${show.vote_average}</p>
                                                </div>
                                            </div>
                                            <div class="tituloShow">${show.title}</div>
                                            <div class="contenedorBtn">
                                                <button class="btnWatchlist" onclick="btnWatchlistPelicula(${show.id})">Agregar a Watchlist</button>
                                                <button class="btnColeccion" onclick="btnColeccionPelicula(${show.id})">Agregar a Coleccion</button>
                                            </div>
                                        </div>
                                        `;
            //Insertamos las series dentro de un nuevo array
            peliculas.push(show);
        });
    })
    .catch((error) => console.error(error));

//cargamos las colecciones y watchlist si estan en el localStorage
if (localStorage.getItem("coleccionSeries")) {
    coleccionSeries = JSON.parse(localStorage.getItem("coleccionSeries"));
}

if (localStorage.getItem("coleccionPeliculas")) {
    coleccionPeliculas = JSON.parse(localStorage.getItem("coleccionPeliculas"));
}

if (localStorage.getItem("watchlistSeries")) {
    watchlistSeries = JSON.parse(localStorage.getItem("watchlistSeries"));
}

if (localStorage.getItem("watchlistPeliculas")) {
    watchlistPeliculas = JSON.parse(localStorage.getItem("watchlistPeliculas"));
}

//Creamos la funcion agregar serie a nuestra coleccion
function agregarSerieColeccion(id) {
    const serie = coleccionSeries.find((show) => show.id === id);
    if (serie) {
        Toastify({
            text: "Ya pertenece a tu coleccion!",
            duration: 3000,
            style: {
                background: "red",
            },
        }).showToast();
    } else {
        Toastify({
            text: "Agregada a tu coleccion",
            duration: 3000,
            style: {
                background: "green",
            },
        }).showToast();
        let buscarSerie = series.find((show) => show.id === id);
        coleccionSeries.push(buscarSerie);
        localStorage.setItem(
            "coleccionSeries",
            JSON.stringify(coleccionSeries)
        );
    }
}

//Creamos la funcion agregar pelicula a nuestra coleccion
function agregarPeliculaColeccion(id) {
    const pelicula = coleccionPeliculas.find((show) => show.id === id);
    if (pelicula) {
        Toastify({
            text: "Ya pertenece a tu coleccion!",
            duration: 3000,
            style: {
                background: "red",
            },
        }).showToast();
    } else {
        Toastify({
            text: "Agregada a tu coleccion",
            duration: 3000,
            style: {
                background: "green",
            },
        }).showToast();
        let buscarPelicula = peliculas.find((show) => show.id === id);
        coleccionPeliculas.push(buscarPelicula);
        localStorage.setItem(
            "coleccionPeliculas",
            JSON.stringify(coleccionPeliculas)
        );
    }
}

const emptySerie = document.getElementById("emptySerie");
const emptyPelicula = document.getElementById("emptyPelicula");

//Llamamos a la funcion onclick para agregar una serie y pelicula a nuestra coleccion de series y ocultamos el mensaje de vacio
function btnColeccionSerie(id) {
    agregarSerieColeccion(id);
}

function btnColeccionPelicula(id) {
    agregarPeliculaColeccion(id);
}

//Creamos la funcion para agregar series a la watchlist
function agregarSerieWatchlist(id) {
    const serie = watchlistSeries.find((show) => show.id === id);
    if (serie) {
        Toastify({
            text: "Ya pertenece a tu Watchlist!",
            duration: 3000,
            style: {
                background: "red",
            },
        }).showToast();
    } else {
        Toastify({
            text: "Agregada a tu Watchlist!",
            duration: 3000,
            style: {
                background: "green",
            },
        }).showToast();
        let buscarSerie = series.find((show) => show.id === id);
        watchlistSeries.push(buscarSerie);
        localStorage.setItem(
            "watchlistSeries",
            JSON.stringify(watchlistSeries)
        );
    }
}

//Creamos la funcion agregar Pelicula a nuestra watchlist
function agregarPeliculaWatchlist(id) {
    const pelicula = watchlistPeliculas.find((show) => show.id === id);
    if (pelicula) {
        Toastify({
            text: "Ya pertenece a tu Watchlist!",
            duration: 3000,
            style: {
                background: "red",
            },
        }).showToast();
    } else {
        Toastify({
            text: "Agregada a tu Watchlist!",
            duration: 3000,
            style: {
                background: "green",
            },
        }).showToast();
        let buscarPelicula = peliculas.find((show) => show.id === id);
        watchlistPeliculas.push(buscarPelicula);
        localStorage.setItem(
            "watchlistPeliculas",
            JSON.stringify(watchlistPeliculas)
        );
    }
}

//Agregamos la serie a nuestra watchlist
function btnWatchlistSerie(id) {
    agregarSerieWatchlist(id);
}

//Agregamos la pelicula a nuestra watchlist
function btnWatchlistPelicula(id) {
    agregarPeliculaWatchlist(id);
}
