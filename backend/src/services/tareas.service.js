import { conectar } from '../db/conexion.js';

export async function obtenerTareas() {
  let conexion;
  try {
    conexion = await conectar();
    const resultado = await conexion.execute(
      `SELECT t.tar_codigo                       AS CODIGO,
              t.tar_actividad                    AS ACTIVIDAD,
              t.tar_estado                       AS ESTADO,
              TO_CHAR(t.tar_fecha, 'YYYY-MM-DD') AS FECHA,
              t.tar_mat_codigo                   AS MATERIA_COD,
              m.mat_materia                      AS MATERIA,
              t.tar_prioridad                    AS PRIORIDAD,
              t.tar_descripcion                  AS DESCRIPCION
         FROM GDT_TAREAS t
         JOIN GDT_MATERIAS m ON m.mat_codigo = t.tar_mat_codigo
        ORDER BY t.tar_fecha`
    );
    return resultado.rows;
  } finally {
    if (conexion) await conexion.close();
  }
}

export async function insertarTarea(tarea) {
  let conexion;
  try {
    conexion = await conectar();
    await conexion.execute(
      `INSERT INTO GDT_TAREAS
         (tar_actividad, tar_estado, tar_fecha, tar_mat_codigo, tar_prioridad, tar_descripcion)
       VALUES
         (:actividad, NVL(:estado, 'P'), TO_DATE(:fecha, 'YYYY-MM-DD'), :materia, :prioridad, :descripcion)`,
      {
        actividad: tarea.actividad,
        estado: tarea.estado ?? null,
        fecha: tarea.fecha,
        materia: tarea.materia,
        prioridad: tarea.prioridad ?? null,
        descripcion: tarea.descripcion ?? null,
      },
      { autoCommit: true }
    );
  } finally {
    if (conexion) await conexion.close();
  }
}

export async function actualizarTarea(codigo, tarea) {
  let conexion;
  try {
    conexion = await conectar();
    await conexion.execute(
      `UPDATE GDT_TAREAS
          SET tar_actividad   = NVL(:actividad, tar_actividad),
              tar_estado      = NVL(:estado, tar_estado),
              tar_fecha       = NVL(TO_DATE(:fecha, 'YYYY-MM-DD'), tar_fecha),
              tar_mat_codigo  = NVL(:materia, tar_mat_codigo),
              tar_prioridad   = NVL(:prioridad, tar_prioridad),
              tar_descripcion = NVL(:descripcion, tar_descripcion)
        WHERE tar_codigo = :codigo`,
      {
        codigo,
        actividad: tarea.actividad ?? null,
        estado: tarea.estado ?? null,
        fecha: tarea.fecha ?? null,
        materia: tarea.materia ?? null,
        prioridad: tarea.prioridad ?? null,
        descripcion: tarea.descripcion ?? null,
      },
      { autoCommit: true }
    );
  } finally {
    if (conexion) await conexion.close();
  }
}

export async function eliminarTarea(codigo) {
  let conexion;
  try {
    conexion = await conectar();
    await conexion.execute(
      `DELETE FROM GDT_TAREAS WHERE tar_codigo = :codigo`,
      { codigo },
      { autoCommit: true }
    );
  } finally {
    if (conexion) await conexion.close();
  }
}