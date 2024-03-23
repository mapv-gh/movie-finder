// eslint-disable-next-line react/prop-types
function ListOfMovies ({movies}){
  return (
    <ul className="movies">
    {
        // eslint-disable-next-line react/prop-types
        movies.map(movie =>(
            <li className="movie" key={movie.id}>
              <img src={movie.poster} alt={movie.title}/>
              <h3>{movie.title}</h3>
              <h3>{movie.year}</h3>
            </li>
        )
        )
    }
    </ul>
  )
}

function NoMoviesResults(){
    return <p>No se encuentran películas para esta busqueda</p>;
}

// eslint-disable-next-line react/prop-types
export function Movies({movies}){
  // eslint-disable-next-line react/prop-types
  const hasMovies = movies?.length>0;
  return(
    hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />
  )
}
