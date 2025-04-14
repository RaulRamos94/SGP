function Paginacao({ totalPages, currentPage, onPageChange }) {
    if (totalPages <= 1) return null;

    return (
        <div className="d-flex justify-content-center my-4 gap-2 flex-wrap">
            <button
                className="btn btn-outline-secondary rounded-pill"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
            >
                Anterior
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    className={`btn rounded-pill ${currentPage === index ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => onPageChange(index)}
                >
                    {index + 1}
                </button>
            ))}

            <button
                className="btn btn-outline-secondary rounded-pill"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
            >
                Próxima
            </button>
        </div>
    );
}

export default Paginacao;
