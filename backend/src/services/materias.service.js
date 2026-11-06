import { conectar } from '../db/conexion.js';

export async function obtenerMaterias() {
  let conexion;
  try {
    conexion = await conectar();
    const resultado = await conexion.execute(
      `SELECT 
        mat_codigo as codigo, 
        mat_materia as materia
       FROM 
        GDT_MATERIAS
       ORDER BY mat_materia`
    );
    return resultado.rows;
  } finally {
    if (conexion) await conexion.close();
  }
}