import { useState } from "react";
import { crearTarea } from "../services/tareas";
import MateriasSelect from "./MateriasSelect";

function TareaForm({ onCerrar }) {

    const [actividad, setActividad] = useState("");
    const [fecha, setFecha] = useState("");
    const [materia, setMateria] = useState("");
    const [prioridad, setPrioridad] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const [estadoBoton, setEstadoBoton] = useState("normal");

    const hoy = new Date().toLocaleDateString("en-CA");

    const guardarTarea = async (e) => {
        e.preventDefault();

        setEstadoBoton("guardando");

        try {
            await crearTarea({
                actividad: actividad,
                fecha: fecha || null,
                materia: Number(materia),
                prioridad: prioridad || null,
                descripcion: descripcion || null
            });

            setEstadoBoton("guardado");

            setTimeout(() => {
                onCerrar();
            }, 1000);

        } catch (error) {
            console.error("Error:", error);
            setEstadoBoton("normal");
            alert("No se pudo guardar la tarea");
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
                min={hoy}
                onChange={(e) => setFecha(e.target.value)}
            />

            <label>Materia:</label>
            <MateriasSelect value={materia} onChange={setMateria} />

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

            <button
                type="submit"
                className={`btn-guardar ${estadoBoton}`}
                disabled={estadoBoton !== "normal"}
            >
                {estadoBoton === "normal" && "Guardar tarea"}
                {estadoBoton === "guardando" && <span className="spinner"></span>}
                {estadoBoton === "guardado" && "Tarea guardada"}
            </button>

        </form>
    );
}

export default TareaForm;