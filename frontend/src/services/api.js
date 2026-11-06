// URL base de la API, definida en frontend/.env (VITE_API_URL)
const API_URL = import.meta.env.VITE_API_URL;

export async function verificarSalud() {
  const respuesta = await fetch(`${API_URL}/health`);
  const datos = await respuesta.json();
  if (!respuesta.ok) throw new Error(datos.error || 'Error en la API');
  return datos;
}
