import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard/MovieCardIndex";
import Pagination from "./components/Pagination/PaginationIndex";
import styles from "./App.module.css";

const API_KEY = "c05da5b14c74c22897e7ea13622e01aa";

function App() {
  // Estados para manejar películas, error, carga, página actual, total de páginas y término de búsqueda
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Restablecer búsqueda
  const resetSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
    setPage(1);
  };

  // Cargar películas "now playing" al iniciar o cambiar de página
  useEffect(() => {
    if (isSearching) return; 

    setLoading(true);
    setError(null);

    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=es-MX&page=${page}`)
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

  // Buscar películas por término
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;

    setIsSearching(true);
    setLoading(true);
    setError(null);

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-MX&query=${encodeURIComponent(searchTerm)}`)
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
  };

  // Renderizado
  return (
    <div className={styles.container}>
      <h1>Películas en Cartelera 🎬</h1>

      {/* Formulario de búsqueda */}
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Buscar película..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Buscar
        </button>
      </form>

      {isSearching && (
        <div className={styles.backButton}>
          <button onClick={resetSearch}>Volver a cartelera</button>
        </div>
      )}

      {loading && <p className={styles.loading}>Cargando películas...</p>}
      {error && <p className={styles.error}>{error}</p>}


      {/* Listado de películas */}
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}

      {/* Paginación (solo si no estás buscando) */}
      {!isSearching && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={() => setPage((p) => Math.max(p - 1, 1))}
          onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
        />
      )}
    </div>
  );
}

export default App;
