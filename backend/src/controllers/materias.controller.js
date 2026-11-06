import { obtenerMaterias } from '../services/materias.service.js';

export async function listarMaterias(req, res) {
  try {
    const materias = await obtenerMaterias();
    res.json(materias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}