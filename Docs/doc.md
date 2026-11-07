# API Gestor de Tareas

Backend en Node.js + Express conectado a Oracle XE.

**URL base:** `http://localhost:3000`

## Cómo correrlo

1. Copiar `.env.example` como `.env` y llenar los datos de Oracle.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Levantar el servidor:
   ```bash
   npm run dev
   ```

---

## Materias

### Listar materias

```
GET /api/materias
```

Respuesta:

```json
[
  { "MAT_CODIGO": 1, "MAT_MATERIA": "Redes 2" },
  { "MAT_CODIGO": 2, "MAT_MATERIA": "Programación y Plataformas Web" }
]
```

---

## Tareas

### Listar tareas

```
GET /api/tareas
```

Respuesta:

```json
[
  {
    "CODIGO": 1,
    "ACTIVIDAD": "Gestion de Tareas",
    "ESTADO": "P",
    "FECHA": "2026-11-03",
    "MATERIA_COD": 2,
    "MATERIA": "Programación y Plataformas Web",
    "PRIORIDAD": "B",
    "DESCRIPCION": null
  }
]
```

### Crear tarea

```
POST /api/tareas
```

Body:

```json
{
  "actividad": "Práctica 4",
  "fecha": "2026-11-10",
  "materia": 1,
  "estado": "P",
  "prioridad": "A",
  "descripcion": "Configurar VLANs"
}
```

- **Obligatorios:** `actividad`, `fecha` (formato `YYYY-MM-DD`), `materia` (código).
- **Opcionales:** `estado` (por defecto `P`), `prioridad`, `descripcion`.

Respuesta (`201`):

```json
{ "mensaje": "Tarea creada" }
```

### Actualizar tarea

```
PATCH /api/tareas/:codigo
```

Solo se mandan los campos que se quieren cambiar.

Ejemplo, marcar como finalizada:

```
PATCH /api/tareas/1
```

```json
{ "estado": "F" }
```

Ejemplo, cambiar varios campos:

```json
{ "actividad": "Práctica 4 corregida", "prioridad": "M", "fecha": "2026-11-12" }
```

Respuesta:

```json
{ "mensaje": "Tarea actualizada" }
```

### Eliminar tarea

```
DELETE /api/tareas/:codigo
```

Ejemplo:

```
DELETE /api/tareas/1
```

Respuesta:

```json
{ "mensaje": "Tarea eliminada" }
```

---

## Valores permitidos

| Campo       | Valores                                              |
|-------------|------------------------------------------------------|
| `estado`    | `P` = Pendiente, `E` = En Progreso, `F` = Finalizada |
| `prioridad` | `B` = Baja, `M` = Media, `A` = Alta                  |

Los valores van en **mayúscula**.


## Errores

Si algo falla, cualquier ruta responde `500`:

```json
{ "error": "ORA-xxxxx: mensaje de Oracle" }
```