const API_URL = import.meta.env.VITE_API_URL;

export async function listarTareas() {
    const response = await fetch(`${API_URL}/tareas`);

    if (!response.ok) {
        throw new Error("Error al cargar las tareas");
    }

    return response.json();
}

export async function crearTarea(tarea) {
    const response = await fetch(`${API_URL}/tareas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tarea)
    });

    if (!response.ok) {
        throw new Error("Error al guardar la tarea");
    }

    return response.json();
}

export async function actualizarTarea(codigo, tarea) {
    const response = await fetch(`${API_URL}/tareas/${codigo}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tarea)
    });

    if (!response.ok) {
        throw new Error("Error al actualizar la tarea");
    }

    return response.json();
}

export async function eliminarTarea(codigo) {
    const response = await fetch(`${API_URL}/tareas/${codigo}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Error al eliminar la tarea");
    }

    return response.json();
}