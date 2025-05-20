import { useState } from 'react'
import './App.css'
import MovieCard from './MovieCard'

function App() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    if (!query) return

    setLoading(true)
    setError(null)
    setMovies([])

    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=ad709235&s=${encodeURIComponent(query)}`)
      const data = await res.json()

      if (data.Response === 'True') {
        setMovies(data.Search)
      } else {
        setError(data.Error)
      }
    } catch (err) {
      setError('Error al cargar las películas.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch()
  }

  return (
    <div className="app">
      <header className="top-bar">
        <h1>Buscador de Películas</h1>
        <form className="search-box" onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            placeholder="Escribe el nombre de la película"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main className="results-section">
        {loading && <div className="loader"></div>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="results">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              year={movie.Year}
              poster={movie.Poster}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
