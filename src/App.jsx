import './App.css'
import {useMovies} from './hooks/useMovies.js'
import { Movies } from './components/Movies.jsx'
import { useCallback, useState } from 'react'
import { useEffect, useRef } from 'react'
import debounce from 'just-debounce-it'



function useSearch (){
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirtInput = useRef(true)

  useEffect(()=>{
    if(isFirtInput.current){
      isFirtInput.current = search ===''
      return
    }
    if(search == ''){
      setError('No se puede buscar una pelicula vacía')
      return
    }
    if(search.match(/^\d+$/)){
      setError('La búsqueda contiene caracteres especiales')
      return
    }
    if(search.length < 3){
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }
    setError(null)
  },[search])

  return [search, updateSearch, error]
}

function App() {
  const [sort, setSort] = useState(false)

  const [search, updateSearch, error] = useSearch()
  const {movies,loading, getMovies}= useMovies({search, sort})

  const debounceGetMovies = useCallback(
  debounce(search=>{
  console.log('search',search)
  getMovies({search})
 },300)
 ,[getMovies])

  const handleSubmit = (event) => {
    event.preventDefault()
   getMovies({search})
  }

 const handleSort = () => {
    setSort(!sort)
  }


// Actualiza la búsqueda y realiza una nueva consulta de películas cada vez que cambia el valor del input.
  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(event.target.value)
    debounceGetMovies(newSearch)
  }
  return (
    
   <div className='page'>
    <header> 
    <h1>Buscador de películas</h1>
    <form className='form'onSubmit={handleSubmit}>
      <input
      style={{border: '1px solid transparent',
        borderColor: error? 'red': 'transparent'
      }}
      onChange={handleChange} value={search} name='search' type='text' placeholder='Buscar película' />
     <input type="checkbox" onChange={handleSort} checked={sort} />
      <button type='submit'>Buscar</button>
    </form>
    {error && <p style={{color:'red'}}>{error}</p>}
    </header>

    <main>
      {
        loading ? <p>Cargando.....</p>: <Movies movies={movies}/>
      } 
    </main>
    </div>
  )
}

export default App
