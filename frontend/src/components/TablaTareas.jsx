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

function TablaTareas({ tareas, onEditar, onEliminar }) {

    if (tareas.length === 0) {
        return (
            <div className="tabla-vacia">
                <p>No hay tareas registradas</p>
                <small>Usa el botón "Añadir tarea" para crear la primera.</small>
            </div>
        );
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Actividad</th>
                    <th>Estado</th>
                    <th>Fecha de entrega</th>
                    <th>Materia</th>
                    <th>Notas</th>
                    <th>Prioridad</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {tareas.map((tarea) => (
                    <tr key={tarea.CODIGO}>
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
                ))}
            </tbody>
        </table>
    );
}

export default TablaTareas;