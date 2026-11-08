import { useContext } from "react";
import { FiltroContext } from "../../context/FiltroContext";
import './FiltrosTareas.css'

const OPCIONES = [
    { valor: "todas", texto: "Todas" },
    { valor: "P", texto: "Pendientes" },
    { valor: "E", texto: "En progreso" },
    { valor: "F", texto: "Completadas" }
];

function FiltrosTareas() {
    const { filtro, setFiltro } = useContext(FiltroContext);

    return (
        <div className="filtros">
            {OPCIONES.map((opcion) => (
                <button
                    key={opcion.valor}
                    type="button"
                    className={filtro === opcion.valor ? "activo" : ""}
                    onClick={() => setFiltro(opcion.valor)}
                >
                    {opcion.texto}
                </button>
            ))}
        </div>
    );
}

export default FiltrosTareas;