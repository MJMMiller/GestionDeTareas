const API_URL = import.meta.env.VITE_API_URL;

export async function listarMaterias() {
    const response = await fetch(`${API_URL}/materias`);

    if (!response.ok) {
        throw new Error("Error al cargar las materias");
    }

    return response.json();
}