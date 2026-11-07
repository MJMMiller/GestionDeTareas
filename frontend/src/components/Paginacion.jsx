function Paginacion({ pagina, totalPaginas, desde, hasta, total, onCambiar }) {

    const paginas = [];
    for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
    }

    return (
        <nav aria-label="Paginación de tareas">
            <p>Mostrando {desde} - {hasta} de {total} tareas</p>

            <button
                type="button"
                onClick={() => onCambiar(pagina - 1)}
                disabled={pagina === 1}
            >
                Anterior
            </button>

            {paginas.map((numero) => (
                <button
                    key={numero}
                    type="button"
                    className={numero === pagina ? "activa" : ""}
                    onClick={() => onCambiar(numero)}
                >
                    {numero}
                </button>
            ))}

            <button
                type="button"
                onClick={() => onCambiar(pagina + 1)}
                disabled={pagina === totalPaginas}
            >
                Siguiente
            </button>
        </nav>
    );
}

export default Paginacion;