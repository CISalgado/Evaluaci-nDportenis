import { useEffect, useState } from "react";

const API_KEY = "c05da5b14c74c22897e7ea13622e01aa";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isSearching) return;
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
  }, [page, isSearching]);


  if (loading) return <p style={{ textAlign: "center" }}>Cargando películas...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div className="container">
      <h1>Películas Now Playing 🎬</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (searchTerm.trim() === "") return;
          setIsSearching(true);
          setLoading(true);
          fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`)
            .then((res) => {
              if (!res.ok) throw new Error("Error al buscar películas");
              return res.json();
            })
            .then((data) => {
              setMovies(data.results);
              setLoading(false);
            })
            .catch((err) => {
              setError(err.message);
              setLoading(false);
            });
        }}
        style={{ marginBottom: "20px", textAlign: "center" }}
        >
        <input
          type="text"
          placeholder="Buscar película..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "60%", maxWidth: "400px" }}
        />
        <button type="submit" style={{ padding: "8px 12px", marginLeft: "10px" }}>
          Buscar
        </button>
      </form>

      {isSearching && (
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <button
          onClick={() => {
            setSearchTerm("");
            setIsSearching(false);
            setPage(1);
          }}
        >
          Volver a cartelera
        </button>
      </div>
      )}

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
