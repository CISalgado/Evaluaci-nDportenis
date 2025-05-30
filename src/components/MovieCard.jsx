const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <h2>{movie.title}</h2>
      <p><strong>Fecha de estreno:</strong> {movie.release_date}</p>
      {movie.poster_path && (
        <img src={IMG_BASE_URL + movie.poster_path} alt={movie.title} />
      )}
      <p>{movie.overview}</p>
    </div>
  );
}

export default MovieCard;