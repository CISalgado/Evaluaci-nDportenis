function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <button onClick={onPrev} disabled={page === 1}>
        Anterior
      </button>

      <span style={{ margin: "0 10px" }}>
        Página {page} de {totalPages}
      </span>

      <button onClick={onNext} disabled={page === totalPages}>
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;