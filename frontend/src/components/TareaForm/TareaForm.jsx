import { useState } from "react";
import { crearTarea, actualizarTarea } from "../../services/tareas";
import MateriasSelect from "../MateriasSelect";
import './TareaForm.css'

function TareaForm({ tarea, onGuardado, onError }) {

    const [actividad, setActividad] = useState(tarea?.ACTIVIDAD ?? "");
    const [fecha, setFecha] = useState(tarea?.FECHA ?? "");
    const [materia, setMateria] = useState(tarea ? String(tarea.MATERIA_COD) : "");
    const [estado, setEstado] = useState(tarea?.ESTADO ?? "P");
    const [prioridad, setPrioridad] = useState(tarea?.PRIORIDAD ?? "");
    const [descripcion, setDescripcion] = useState(tarea?.DESCRIPCION ?? "");

    const hoy = new Date().toLocaleDateString("en-CA");

    const guardarTarea = async (e) => {
        e.preventDefault();

        const datos = {
            actividad: actividad,
            fecha: fecha || null,
            materia: Number(materia),
            prioridad: prioridad || null,
            descripcion: descripcion || null
        };

        try {
            if (tarea) {
                await actualizarTarea(tarea.CODIGO, { ...datos, estado: estado });
                onGuardado("Tarea actualizada correctamente");
            } else {
                await crearTarea(datos);
                onGuardado("Tarea creada correctamente");
            }
        } catch (error) {
            console.error("Error:", error);
            onError("No se pudo guardar la tarea");
        }
    };

    return (
        <form onSubmit={guardarTarea}>

            <label>Actividad:</label>
            <input
                type="text"
                maxLength={200}
                value={actividad}
                onChange={(e) => setActividad(e.target.value)}
                required
            />

            <label>Fecha de entrega:</label>
            <input
                type="date"
                value={fecha}
                min={tarea ? undefined : hoy}
                onChange={(e) => setFecha(e.target.value)}
            />

            <label>Materia:</label>
            <MateriasSelect value={materia} onChange={setMateria} />

            {tarea && (
                <>
                    <label>Estado:</label>
                    <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                        <option value="P">Sin empezar</option>
                        <option value="E">En progreso</option>
                        <option value="F">Finalizada</option>
                    </select>
                </>
            )}

            <label>Prioridad:</label>
            <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                <option value="">Sin prioridad</option>
                <option value="B">Baja</option>
                <option value="M">Media</option>
                <option value="A">Alta</option>
            </select>

            <label>Notas:</label>
            <textarea
                maxLength={500}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            />

            <button type="submit" className="btn-guardar">
                {tarea ? "Actualizar tarea" : "Guardar tarea"}
            </button>

        </form>
    );
}

export default TareaForm;