import {
  obtenerTareas,
  insertarTarea,
  actualizarTarea,
  eliminarTarea,
} from '../services/tareas.service.js';

export async function listarTareas(req, res) {
  try {
    const tareas = await obtenerTareas();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function crearTarea(req, res) {
  try {
    await insertarTarea(req.body);
    res.status(201).json({ mensaje: 'Tarea creada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function modificarTarea(req, res) {
  try {
    await actualizarTarea(req.params.codigo, req.body);
    res.json({ mensaje: 'Tarea actualizada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function borrarTarea(req, res) {
  try {
    await eliminarTarea(req.params.codigo);
    res.json({ mensaje: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}