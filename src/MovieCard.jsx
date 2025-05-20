import { useState } from 'react'
import './App.css'

function MovieCard({ title, year, poster }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="movie-card">
      <div className="poster-container">
        {!imgError ? (
          <img
            src={poster}
            alt={title}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="placeholder">Imagen no encontrada</div>
        )}
      </div>
      <h3>{title}</h3>
      <p>{year}</p>
    </div>
  )
}

export default MovieCard
