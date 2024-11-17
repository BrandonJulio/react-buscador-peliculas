const API_KEY ='17b49441'

export const searchMovies = async ({search})=>{
    if (search === '') return null
   try {
        const response= await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${search}`)
        const json = await response.json()

        const movies = json.Search
        // Este condigo es el que decide como se hace la transformación de estos datos que viene de la API
        return movies?.map(movie =>({
                id: movie.imdbID,
                title: movie.Title,
                year:movie.Year,
                poster: movie.Poster
            }))
    }
        catch (e) {
        throw new Error ('Error searching for movie')
    }
}