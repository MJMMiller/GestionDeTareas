const ESTADOS = { P: "Sin empezar", E: "En progreso", F: "Finalizada" };
const PRIORIDADES = { B: "Baja", M: "Media", A: "Alta" };

function formatearFecha(fecha) {
    if (!fecha) return "—";
    const [anio, mes, dia] = fecha.split("-");
    return new Date(anio, mes - 1, dia).toLocaleDateString("es-EC", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function TaskItem({ tarea, onCompletar, onEditar, onEliminar }) {

    const completada = tarea.ESTADO === "F";

    return (
        <tr className={completada ? "fila-completada" : ""}>
            <td className="casillaMarcarEstado">
                <input
                    type="checkbox"
                    className="marcarEstado"
                    title={completada ? "Marcar como pendiente" : "Marcar como completada"}
                    checked={completada}
                    onChange={() => onCompletar(tarea)}
                />
            </td>
            <td>{tarea.ACTIVIDAD}</td>
            <td>{ESTADOS[tarea.ESTADO]}</td>
            <td>{formatearFecha(tarea.FECHA)}</td>
            <td>{tarea.MATERIA}</td>
            <td>{tarea.DESCRIPCION ?? "—"}</td>
            <td>{PRIORIDADES[tarea.PRIORIDAD] ?? "—"}</td>
            <td>
                <button
                    type="button"
                    className="btn-icono"
                    title="Editar"
                    onClick={() => onEditar(tarea)}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                    </svg>
                </button>

                <button
                    type="button"
                    className="btn-icono btn-icono-peligro"
                    title="Eliminar"
                    onClick={() => onEliminar(tarea)}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="M19 6l-1 14H6L5 6" />
                    </svg>
                </button>
            </td>
        </tr>
    );
}

export default TaskItem;