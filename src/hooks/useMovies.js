import { useState } from 'react'
import { searchMovies} from '../services/movies.js'
import { useRef, useMemo, useCallback  } from 'react'


export function useMovies({ search, sort }) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previosSearch = useRef(search)


    const getMovies = useCallback(async ({search}) => {
        if(search === previosSearch.current) return
        try {
            setLoading(true)
            setError(null)
            previosSearch.current = search
            const newMovies = await searchMovies({ search })
            setMovies(newMovies)
        }
        catch(e) {
            setError(e.message)
        }finally{
            //Tanto como en el try como en el cath
            setLoading(false)
        }
    },[])
    
    const sortedMovies = useMemo (() =>{
        return sort
        ?[...movies].sort((a,b)=>a.title.localeCompare(b.title))
        :movies
    },[sort,movies])    

    return { movies: sortedMovies, getMovies, loading }
}
    
//Esto es una caja negra que podemos iterar en ella