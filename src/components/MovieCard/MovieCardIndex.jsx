//MovieCardIndex.jsx
import { Link } from "react-router-dom";
import styles from "./MovieCardStyle.module.css";

function MovieCard({ movie }) {
  return (
    <div className={styles.card}>
      <Link to={`/movie/${movie.id}`}>
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        )}
      </Link>
      <h2>{movie.title}</h2>
      <p><strong>Fecha de estreno:</strong> {movie.release_date}</p>
      <p>{movie.overview}</p>
    </div>
  );
}

export default MovieCard;
