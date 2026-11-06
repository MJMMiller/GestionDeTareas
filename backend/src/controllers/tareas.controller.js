import { obtenerTareas } from '../services/tareas.service.js';

export async function listarTareas(req, res) {
  try {
    const tareas = await obtenerTareas();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}