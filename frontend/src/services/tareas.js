// Adaptador temporal: sustituir estas funciones por fetch al backend cuando esté listo.
// Las fechas se intercambian como YYYY-MM-DD, sin conversión de zona horaria.
const clave = 'gestor-tareas-v1'
const ejemplos = [
  ['Práctica 3', 'Sin empezar', '2026-11-06', 'Redes 2'],
  ['Práctica 2', 'Sin empezar', '2026-11-05', 'Redes 2'],
  ['Práctica 1', 'En curso', '2026-11-03', 'Redes 2'],
  ['Prueba Redes', 'Sin empezar', '2026-11-05', 'Redes 2'],
  ['Api Web Simpsons', 'En curso', '2026-11-05', 'Programación y Plataformas Web'],
  ['Modelo de datos', 'Completada', '2026-11-02', 'Base de datos'],
  ['Consultas SQL', 'Completada', '2026-11-01', 'Base de datos'],
  ['Informe de laboratorio', 'Sin empezar', '2026-11-09', 'Redes 2'],
  ['Diseño de interfaz', 'En curso', '2026-11-10', 'Programación y Plataformas Web'],
  ['Investigación React', 'Completada', '2026-10-30', 'Programación y Plataformas Web'],
  ['Diagrama de clases', 'Completada', '2026-10-29', 'Base de datos'],
  ['Proyecto final', 'Sin empezar', '2026-11-20', 'Programación y Plataformas Web'],
].map(([titulo, estado, fecha, materia], i) => ({ id: String(i + 1), titulo, estado, fecha, materia, notas: '', prioridad: 'Media' }))

export async function listarTareas() {
  const guardadas = localStorage.getItem(clave)
  if (!guardadas) return ejemplos
  const datos = JSON.parse(guardadas)
  if (!Array.isArray(datos)) throw new Error('Los datos locales no son válidos.')
  return datos
}

export async function guardarTareas(tareas) {
  localStorage.setItem(clave, JSON.stringify(tareas))
  return tareas
}
