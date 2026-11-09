import { useContext, useEffect, useState } from "react";
import { FiltroContext } from "../../context/FiltroContext";
import TaskItem from "../TaskItem/TaskItem";
import Paginacion from "../Paginacion";
import './TablaTareas.css'

const POR_PAGINA = 5;

function TablaTareas({ tareas, cargando, onCompletar, onEditar, onEliminar }) {

    const { filtro } = useContext(FiltroContext);
    const [pagina, setPagina] = useState(1);

    useEffect(() => {
        setPagina(1);
    }, [filtro]);

    const tareasFiltradas = filtro === "todas"
        ? tareas
        : tareas.filter((t) => t.ESTADO === filtro);

    const totalPaginas = Math.max(1, Math.ceil(tareasFiltradas.length / POR_PAGINA));
    const paginaActual = Math.min(pagina, totalPaginas);
    const inicio = (paginaActual - 1) * POR_PAGINA;
    const tareasPagina = tareasFiltradas.slice(inicio, inicio + POR_PAGINA);

    if (cargando) {
        return (
            <div className="tabla-contenedor">
                <div className="tabla-vacia">
                    <p>Cargando tareas...</p>
                </div>
            </div>
        );
    }


    if (tareasFiltradas.length === 0) {
        return (
            <div className="tabla-contenedor">
                <div className="tabla-vacia">
                    <p>
                        {tareas.length === 0
                            ? "No hay tareas registradas"
                            : "No hay tareas con este filtro"}
                    </p>
                    <small>
                        {tareas.length === 0
                            ? 'Usa el botón "Añadir tarea" para crear la primera.'
                            : "Prueba con otro filtro."}
                    </small>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="tabla-contenedor">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Actividad</th>
                            <th>Estado</th>
                            <th>Fecha de entrega</th>
                            <th>Materia</th>
                            <th>Descripción</th>
                            <th>Prioridad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tareasPagina.map((tarea) => (
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
            </div>

            <Paginacion
                pagina={paginaActual}
                totalPaginas={totalPaginas}
                desde={inicio + 1}
                hasta={inicio + tareasPagina.length}
                total={tareasFiltradas.length}
                onCambiar={setPagina}
            />
        </>
    );
}

export default TablaTareas;