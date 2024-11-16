import responseMovies from '../mocks/with-result.json'
import withoutResults from '../mocks/no-result.json'

export function useMovies(){
    const movies = responseMovies.Search
    // Este condigo es el que decide como se hace la transformación de estos datos que viene de la API
    const mappedMovies = movies?.map(movie =>{
        return {
            id: movie.imdbID,
            title: movie.Title,
            year:movie.Year,
            poster: movie.Poster
        }
    })
    return {movies:mappedMovies}
}
