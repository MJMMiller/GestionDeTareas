import { useState, useEffect } from "react";
import { listarMaterias } from "../services/materias";

function MateriasSelect({ value, onChange }) {

    const [materias, setMaterias] = useState([]);

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

    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
        >
            <option value="">Seleccione una materia</option>

            {materias.map((materia) => (
                <option key={materia.CODIGO} value={materia.CODIGO}>
                    {materia.MATERIA}
                </option>
            ))}
        </select>
    );
}

export default MateriasSelect;