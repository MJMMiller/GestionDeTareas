# Frontend del gestor de tareas

## Ejecutar

Desde `frontend`:

```sh
npm ci
npm run dev
```

`npm run build` genera el frontend en `dist`.

## Estado actual

Interfaz React con búsqueda por actividad, materia o notas; filtros de materia y prioridad; vistas por estado; agenda ordenada por fecha; paginación y formulario para crear, editar y eliminar.

Los datos de ejemplo y la persistencia temporal están en `src/services/tareas.js`. Se guardan en localStorage únicamente en el navegador actual. No se comparten entre computadoras ni se sincronizan por GitHub. El resumen se calcula a partir de los datos; próximas entregas cuenta tareas pendientes desde hoy hasta los próximos siete días.

## Conexión pendiente con el backend

El navegador debe comunicarse por HTTP con el servidor Express; el servidor es quien accede a Oracle. Las credenciales Oracle permanecen en el backend, fuera del repositorio. No incluirlas en variables VITE_ porque son públicas en el navegador.

Modelo utilizado por la interfaz:

```json
{
  "id": "1",
  "titulo": "Práctica 3",
  "estado": "Sin empezar",
  "fecha": "2026-11-06",
  "materia": "Redes 2",
  "notas": "",
  "prioridad": "Media"
}
```

- `id`: identificador único, representado como texto en el frontend.
- `estado`: `Sin empezar`, `En curso` o `Completada`.
- `fecha`: fecha de entrega en formato `YYYY-MM-DD`.
- `prioridad`: `Alta`, `Media` o `Baja`.

Contrato propuesto para acordar con el compañero del backend (todavía no implementado):

| Método | Ruta | Respuesta |
| --- | --- | --- |
| GET | /api/tareas | Lista de tareas |
| POST | /api/tareas | Tarea creada con id asignado por el servidor |
| PUT | /api/tareas/:id | Tarea actualizada |
| DELETE | /api/tareas/:id | 204 sin contenido |

Al integrar, reemplazar el adaptador local con funciones HTTP para listar, crear, actualizar y eliminar. Actualizar las acciones `guardar` y eliminar en `App.jsx` para usar cada operación y el id devuelto por el servidor, en lugar de guardar la lista completa. Mantener el tratamiento de carga y errores y deshabilitar acciones mientras haya una petición pendiente. Acordar CORS y la URL del backend accesible desde ambas computadoras; `localhost` siempre apunta a la computadora que ejecuta el navegador.

## Colaboración

Los cambios actuales afectan solo al frontend. No requieren cambios en la conexión Oracle. Antes de compartir, revisar `git diff` desde la raíz `GestionDeTareas` y subir los archivos de código y esta documentación; `node_modules`, `.env` y `dist` quedan excluidos por `.gitignore`.
