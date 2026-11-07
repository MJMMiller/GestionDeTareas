import { useState, useEffect } from "react";
import { crearTarea } from "../services/tareas";
import { listarMaterias } from "../services/materias";

function TareaForm({ onCerrar }) {

    const [actividad, setActividad] = useState("");
    const [fecha, setFecha] = useState("");
    const [materia, setMateria] = useState("");
    const [prioridad, setPrioridad] = useState("M");
    const [descripcion, setDescripcion] = useState("");

    const [materias, setMaterias] = useState([]);
    const [estadoBoton, setEstadoBoton] = useState("normal");

    const hoy = new Date().toLocaleDateString("en-CA");

    useEffect(() => {
        const cargarMaterias = async () => {
            try {
                const data = await listarMaterias();
                setMaterias(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        cargarMaterias();
    }, []);

    const guardarTarea = async (e) => {
        e.preventDefault();

        const materiaElegida = materias.find((m) => m.MATERIA === materia);

        if (!materiaElegida) {
            alert("Selecciona una materia de la lista");
            return;
        }

        setEstadoBoton("guardando");

        try {
            await crearTarea({
                actividad: actividad,
                fecha: fecha,
                materia: materiaElegida.CODIGO,
                prioridad: prioridad,
                descripcion: descripcion
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
                required
            />

            <label>Materia:</label>
            <input
                type="text"
                list="lista-materias"
                placeholder="Escribe para buscar..."
                value={materia}
                onChange={(e) => setMateria(e.target.value)}
                required
            />
            <datalist id="lista-materias">
                {materias.map((m) => (
                    <option key={m.CODIGO} value={m.MATERIA} />
                ))}
            </datalist>

            <label>Prioridad:</label>
            <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                <option value="B">Baja</option>
                <option value="M">Media</option>
                <option value="A">Alta</option>
            </select>

            <label>Notas:</label>
            <textarea
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
                {estadoBoton === "guardado" && "Tarea Creada"}
            </button>

        </form>
    );
}

export default TareaForm;