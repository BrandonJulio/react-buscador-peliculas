
import './App.css'

function App() {

  return (
   <div className='page'>
    <header>
    <h1>Buscador de películas</h1>
    <form className='form'>
      <input type='text' placeholder='Buscar película' />
      <button type='submit'>Buscar</button>
    </form>
    </header>

    <main>
      <h1>Aquí irían los resultados</h1>
    </main>
    </div>
  )
}

export default App
