const contenedorWatchlistSeries = document.getElementById(
    "contenedorWatchlistSeries"
);
const contenedorWatchlistPeliculas = document.getElementById(
    "contenedorWatchlistPeliculas"
);

let watchlistSeries = [];
let watchlistPeliculas = [];
let usuarioActivo

//Comprobamos que haya una watchlist en el localStorage de series y/o peliculas y si es asi, la cargamos
if (localStorage.getItem("watchlistSeries")) {
    watchlistSeries = JSON.parse(localStorage.getItem("watchlistSeries"));
}

if (localStorage.getItem("watchlistPeliculas")) {
    watchlistPeliculas = JSON.parse(localStorage.getItem("watchlistPeliculas"));
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

//mostramos la watchlist de series
const mostrarSeries = () => {
    contenedorWatchlistSeries.innerHTML = "";
    if (watchlistSeries.length > 0) {
        watchlistSeries.forEach((show) => {
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
                            <button class="btnWatchlistDelete" onclick="btnWatchlistSerieDelete(${show.id})">Quitar de Watchlist</button>
                        </div>
                    `;

            contenedorWatchlistSeries.appendChild(div);
        });
    } else {
        contenedorWatchlistSeries.innerHTML = `
                                            <h2 class="empty" id="emptySerie">No has agregado ninguna Serie a tu Watchlist</h2>
                                            `;
    }
};

mostrarSeries();

const mostrarPeliculas = () => {
    contenedorWatchlistPeliculas.innerHTML = "";
    if (watchlistPeliculas.length > 0) {
        watchlistPeliculas.forEach((show) => {
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
                            <button class="btnWatchlistDelete" onclick="btnWatchlistPeliculaDelete(${show.id})">Quitar de Watchlist</button>
                        </div>
                    `;

            contenedorWatchlistPeliculas.appendChild(div);
        });
    } else {
        contenedorWatchlistPeliculas.innerHTML = `
                                            <h2 class="empty" id="emptySerie">No has agregado ninguna Serie a tu Watchlist</h2>
                                            `;
    }
};

mostrarPeliculas();

//Creamos la funcion para eliminar serie y/o peliculas
function eliminarSerie(id) {
    const serie = watchlistSeries.find((show) => show.id === id);
    const indice = watchlistSeries.indexOf(serie);
    watchlistSeries.splice(indice, 1);
    localStorage.setItem("watchlistSeries", JSON.stringify(watchlistSeries));
}

function eliminarPelicula(id) {
    const pelicula = watchlistPeliculas.find((show) => show.id === id);
    const indice = watchlistPeliculas.indexOf(pelicula);
    watchlistPeliculas.splice(indice, 1);
    localStorage.setItem(
        "watchlistPeliculas",
        JSON.stringify(watchlistPeliculas)
    );
}

//Llamamos la funcion de eliminar serie y/o pelicula
function btnWatchlistSerieDelete(id) {
    eliminarSerie(id);
    mostrarSeries();
}

function btnWatchlistPeliculaDelete(id) {
    eliminarPelicula(id);
    mostrarPeliculas();
}
