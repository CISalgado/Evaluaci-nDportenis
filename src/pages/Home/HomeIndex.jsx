import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCardIndex";
import Pagination from "../../components/Pagination/PaginationIndex";
import styles from "./HomeStyle.module.css";

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();

  // Cargar página desde location.state o sessionStorage
  useEffect(() => {
    const storedPage = sessionStorage.getItem("lastPage");
    const fromPage = location.state?.fromPage;

    if (fromPage && Number(fromPage) !== page) {
      setPage(Number(fromPage));
    } else if (storedPage && Number(storedPage) !== page) {
      setPage(Number(storedPage));
    }
  }, [location.state]);

  // Guardar página actual
  useEffect(() => {
    sessionStorage.setItem("lastPage", page);
  }, [page]);

  // Cargar películas (solo si no está buscando)
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

  // Buscar películas
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

  const resetSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
    setPage(1);
  };

  return (
    <div className={styles.container}>
      <h1>Películas en Cartelera 🎬</h1>

      {/* Búsqueda */}
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Buscar película..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Buscar</button>
      </form>

      {isSearching && (
        <div className={styles.backButton}>
          <button onClick={resetSearch}>Volver a cartelera</button>
        </div>
      )}

      {/* Mensajes */}
      {loading && <p className={styles.loading}>Cargando películas...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {/* Lista de películas */}
      {movies.map((movie) => (
        <Link
          key={movie.id}
          to={`/movie/${movie.id}`}
          state={{ fromPage: page }}
          className={styles.movieLink}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MovieCard movie={movie} />
        </Link>
      ))}

      {/* Paginación */}
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

export default Home;
