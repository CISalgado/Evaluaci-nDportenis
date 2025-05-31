import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./MovieDetailStyle.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const fromPage = location.state?.fromPage || 1;

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-MX`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar los detalles");
        return res.json();
      })
      .then(setMovie)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className={styles.error}>{error}</p>;
  if (!movie) return <p className={styles.loading}>Cargando detalles...</p>;

  return (
    <div className={styles.container}>
      <button 
        onClick={() => navigate("/", { state: { fromPage } })}
        className={styles.backButton}
      >
        ⬅ Volver
      </button>

      <div className={styles.hoverWrapper}>
        <div className={styles.detailWrapper}>
          {movie.poster_path && (
            <img
              src={IMG_BASE_URL + movie.poster_path}
              alt={movie.title}
              className={styles.img}
            />
          )}
          <div className={styles.info}>
            <h1>{movie.title}</h1>
            <p><strong>Fecha de estreno:</strong> {movie.release_date}</p>
            <p><strong>Calificación:</strong> {movie.vote_average} / 10</p>
            <p><strong>Géneros:</strong> {movie.genres.map(g => g.name).join(", ")}</p>
            <p className={styles.overview}>{movie.overview}</p>
          </div>  
        </div>
      </div>  
    </div>
  );
}

export default MovieDetail;
