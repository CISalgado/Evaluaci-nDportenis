import styles from "./PaginationStyle.module.css";

function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className={styles.pagination}>
      <button onClick={onPrev} disabled={page === 1} className={styles.button}>
        Anterior
      </button>
      <span>
        Página {page} de {totalPages}
      </span>
      <button onClick={onNext} disabled={page === totalPages} className={styles.button}>
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;
