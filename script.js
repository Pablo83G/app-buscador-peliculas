//APP BUSCADOR DE PELÍCULAS
//Activamos el escuchador cuando hacemos click en el boton BUSCAR
document.getElementById('searchButton').addEventListener('click', searchMovies)

let api_key = 'd42459ede30a8381a7b38fd750176bd0'
let url_base = 'https://api.themoviedb.org/3/search/movie'
let url_img = 'https://image.tmdb.org/t/p/w500/'

//Donde vamos a mostrar los resultados (div id='results')
let resultContainer = document.getElementById('results')


function searchMovies() {
    resultContainer.innerHTML = 'Cargando...'
    //VALUE porque vamos a recoger lo que está escrito
    let searchInput = document.getElementById('searchInput').value

    fetch(`${url_base}?api_key=${api_key}&query=${searchInput}`)
        .then(response => response.json())
        .then(response => displayMovies(response.results))
    //results = es el nombre del array de resultados de peliculas 
    //que nos proporciona TMDB
}

function displayMovies(movies) {
    //Se vacíe
    resultContainer.innerHTML = ''

    if (movies.length === 0) {
        resultContainer.innerHTML = '<p>No se encuentran resultados a tu consulta</p>'
        return//Ponemos return para que salga de la función
    }

    movies.forEach(movie => {
        // Creamos un div para cada pelicula
        let movieDiv = document.createElement('div')
        //Le añadimos a movieDiv el estilo de la clase 'movie' del css
        movieDiv.classList.add('movie')
        //Creamos un título
        let title = document.createElement('h2')
        //Lo añadimos con el textContent = el contenido que nos 
        //envía desde TMBD movie.title
        title.textContent = movie.title

        let releaseDate = document.createElement('p')
        releaseDate.textContent = 'La fecha de lanzamiento fue: ' + movie.release_date

        let overview = document.createElement('p')
        overview.textContent = movie.overview

        let posterPath = url_img + movie.poster_path
        let poster = document.createElement('img')
        poster.src = posterPath

        movieDiv.appendChild(poster)
        movieDiv.appendChild(title)
        movieDiv.appendChild(releaseDate)
        movieDiv.appendChild(overview)

        //El div hay que meterlo en otro div
        resultContainer.appendChild(movieDiv)

    });
}




