import { useState, useEffect } from "react";

function Materias() {

    const [materias, setMaterias] = useState([]);
    const [materiaSeleccionada, setMateriaSeleccionada] = useState("");

    useEffect(() => {

        const cargarMaterias = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/materias");

                if (!response.ok) {
                    throw new Error("Error al cargar las materias");
                }

                const data = await response.json();

                setMaterias(data);

            } catch (error) {
                console.error("Error:", error);
            }
        };

        cargarMaterias();

    }, []);

    return (
        <div>
            <label htmlFor="materia"></label>

            <select
                id="materia"
                value={materiaSeleccionada}
                onChange={(e) => setMateriaSeleccionada(e.target.value)}
            >
                <option value="">Materia</option>

                {materias.map((materia) => (
                    <option key={materia.CODIGO} value={materia.CODIGO}>
                        {materia.MATERIA}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Materias;