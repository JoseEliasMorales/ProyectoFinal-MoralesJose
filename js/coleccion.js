const contenedorColeccionSeries = document.getElementById(
    "contenedorColeccionSeries"
);
const contenedorColeccionPeliculas = document.getElementById(
    "contenedorColeccionPeliculas"
);
const emptySerie = document.getElementById("emptySerie");

let coleccionSeries = [];
let coleccionPeliculas = [];
let watchlistSeries = [];
let watchlistPeliculas = [];
let usuarioActivo;

//comprobamos que haya una coleccion de series y/o peliculas guardadas en el localStorage y modificamos el DOM de acuerdo a eso
if (localStorage.getItem("coleccionSeries")) {
    coleccionSeries = JSON.parse(localStorage.getItem("coleccionSeries"));
}

if (localStorage.getItem("coleccionPeliculas")) {
    coleccionPeliculas = JSON.parse(localStorage.getItem("coleccionPeliculas"));
}

//comprobamos si hay una sesion iniciada para mostrar el nombre, de lo contrario no mostramos nada

if (localStorage.getItem("usuarioActivo")) {
    usuarioActivo = localStorage.getItem("usuarioActivo");
}

let inicioSesion = document.getElementById("inicioSesion");
if (usuarioActivo) {
    inicioSesion.innerHTML = `
                            <p class="usuario">${usuarioActivo}</p>
                            <div>
                                <img class="usuario" src="/img/usuario-de-perfil.png" alt="iniciar sesion">
                            </div>
                            `;
}

//mostramos la coleccion de series
const mostrarSeries = () => {
    contenedorColeccionSeries.innerHTML = "";
    if (coleccionSeries.length > 0) {
        coleccionSeries.forEach((show) => {
            const div = document.createElement("div");
            div.classList.add("cardContainer");
            div.innerHTML = `
                        
                        
                        <img  class ="portada" src='https://www.themoviedb.org/t/p/w440_and_h660_face${show.poster_path}'>
                        <div class="containerRating">
                            <div class="circleColeccion">
                                <p class="ratingAverage">${show.vote_average}</p>
                            </div>
                        </div>
                        <div class="tituloShow">${show.name}</div>
                        <div class="contenedorBtn">
                            <button class="btnColeccionDelete" onclick="btnColeccionSerieDelete(${show.id})">Quitar de coleccion</button>
                        </div>
                    `;

            contenedorColeccionSeries.appendChild(div);
        });
    } else {
        contenedorColeccionSeries.innerHTML = `
                                            <h2 class="empty" id="emptySerie">No has agregado ninguna Serie a tu coleccion</h2>
                                            `;
    }
};

mostrarSeries();

//Mostramos la coleccion de peliculas
const mostrarPeliculas = () => {
    contenedorColeccionPeliculas.innerHTML = "";
    if (coleccionPeliculas.length > 0) {
        coleccionPeliculas.forEach((show) => {
            const div = document.createElement("div");
            div.classList.add("cardContainer");
            div.innerHTML = `
                            
                            
                            <img  class ="portada" src='https://www.themoviedb.org/t/p/w440_and_h660_face${show.poster_path}'>
                            <div class="containerRating">
                                <div class="circleColeccion">
                                    <p class="ratingAverage">${show.vote_average}</p>
                                </div>
                            </div>
                            <div class="tituloShow">${show.title}</div>
                            <div class="contenedorBtn">
                                <button class="btnColeccionDelete" onclick="btnColeccionPeliculaDelete(${show.id})">Quitar de coleccion</button>
                            </div>
                        `;

            contenedorColeccionPeliculas.appendChild(div);
        });
    } else {
        contenedorColeccionPeliculas.innerHTML = `
                                            <h2 class="empty" id="emptySerie">No has agregado ninguna Pelicula a tu coleccion</h2>
                                            `;
    }
};

mostrarPeliculas();

//Creamos la funcion eliminar de coleccion de series y/o peliculas

function eliminarSerie(id) {
    const serie = coleccionSeries.find((show) => show.id === id);
    const indice = coleccionSeries.indexOf(serie);
    coleccionSeries.splice(indice, 1);
    localStorage.setItem("coleccionSeries", JSON.stringify(coleccionSeries));
}

function eliminarPelicula(id) {
    const pelicula = coleccionPeliculas.find((show) => show.id === id);
    const indice = coleccionSeries.indexOf(pelicula);
    coleccionPeliculas.splice(indice, 1);
    localStorage.setItem(
        "coleccionPeliculas",
        JSON.stringify(coleccionPeliculas)
    );
}

//Llamamos a la funcion para borrar
function btnColeccionSerieDelete(id) {
    eliminarSerie(id);
    mostrarSeries();
}

function btnColeccionPeliculaDelete(id) {
    eliminarPelicula(id);
    mostrarPeliculas();
}
