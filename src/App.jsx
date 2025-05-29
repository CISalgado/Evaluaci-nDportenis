import { useEffect, useState } from "react";

const API_KEY = "c05da5b14c74c22897e7ea13622e01aa";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar las películas");
        return res.json();
      })
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page]);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando películas...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div className="container">
      <h1>Películas Now Playing 🎬</h1>
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <h2>{movie.title}</h2>
          <p><strong>Fecha de estreno:</strong> {movie.release_date}</p>
          {movie.poster_path && (
            <img src={IMG_BASE_URL + movie.poster_path} alt={movie.title} />
          )}
          <p>{movie.overview}</p>
        </div>
      ))}

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </button>

        <span style={{ margin: "0 10px" }}>
          Página {page} de {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default App;
