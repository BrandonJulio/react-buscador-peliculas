import './App.css'
import {useMovies} from './hooks/useMovies.js'
import { Movies } from './components/Movies.jsx'
import { useState } from 'react'
import { useEffect, useRef } from 'react'



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
  // Este es una caja negra est custom hooks
  const {movies}=useMovies()
  const [search, updateSearch, error] = useSearch()
 

 
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({search})
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
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
      <button type='submit'>Buscar</button>
    </form>
    {error && <p style={{color:'red'}}>{error}</p>}
    </header>

    <main>
     <Movies movies={movies}/>
    </main>
    </div>
  )
}

export default App
