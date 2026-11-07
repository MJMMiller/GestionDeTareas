
import TaskItem from "./TaskItem";

function TablaTareas({
    tareas,
    onCompletar,
    onEditar,
    onEliminar,
    estaFiltrando = false
}) {

    if (tareas.length === 0) {
        return (
            <div className="tabla-vacia">
                <p>
                    {estaFiltrando
                        ? "No hay tareas con este estado"
                        : "No hay tareas registradas"}
                </p>
                <small>
                    {estaFiltrando
                        ? "Selecciona otro filtro para ver más tareas."
                        : 'Usa el botón "Añadir tarea" para crear la primera.'}
                </small>
            </div>
        );
    }

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
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
                    <TaskItem
                        key={tarea.CODIGO}
                        tarea={tarea}
                        onCompletar={onCompletar}
                        onEditar={onEditar}
                        onEliminar={onEliminar}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default TablaTareas;
