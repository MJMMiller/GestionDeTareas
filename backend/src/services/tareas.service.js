import { conectar } from '../db/conexion.js';

export async function obtenerTareas() {
  let conexion;
  try {
    conexion = await conectar();
    const resultado = await conexion.execute(
      `SELECT
        t.TAR_CODIGO AS CODIGO,
        t.TAR_ACTIVIDAD AS ACTIVIDAD,
        t.TAR_ESTADO AS ESTADO,
        t.TAR_FECHA AS FECHA,
        t.TAR_MAT_CODIGO AS MATERIA_COD,
        m.MAT_MATERIA AS MATERIA,
        t.TAR_PRIORIDAD AS PRIORIDAD,
        t.TAR_DESCRIPCION AS DESCRIPCION
      FROM 
        GDT_TAREAS t,
        GDT_MATERIAS m
      WHERE
        t.TAR_MAT_CODIGO = m.mat_codigo;`
    );
    return resultado.rows;
  } finally {
    if (conexion) await conexion.close();
  }
}