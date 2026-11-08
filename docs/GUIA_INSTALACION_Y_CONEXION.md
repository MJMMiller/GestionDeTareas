# Guía de instalación, conexión y diagnóstico — GestionDeTareas

## 1. Objetivo

Que cualquier integrante del grupo pueda clonar el repositorio, preparar un esquema Oracle local y ejecutar la aplicación sin necesitar las contraseñas ni la instalación de sus compañeros.

## 2. Arquitectura de la aplicación

```text
Navegador (React + Vite)
  http://localhost:3001
          |
          | HTTP / JSON (fetch)
          v
Backend (Node.js + Express)
  http://localhost:3000/api
          |
          | driver oracledb y variables de entorno
          v
Oracle Database XE 21c
  localhost:1521/XEPDB1
  Esquema: GESTORTAREAS
  Tablas: GDT_MATERIAS y GDT_TAREAS
```

React **no se conecta directamente a Oracle**. El navegador consulta las rutas HTTP del backend; Express ejecuta las consultas y responde con JSON. Las credenciales de la base de datos permanecen en `backend/.env`.

### Archivos relevantes

| Archivo | Responsabilidad |
| --- | --- |
| `DB/creacion_tablas.sql` | DDL de las dos tablas |
| `DB/insertar_datos.sql` | Registros iniciales para pruebas locales. |
| `backend/src/db/conexion.js` | Lee `DB_USER`, `DB_PASSWORD` y `DB_CONNECT_STRING` y abre conexiones Oracle. |
| `backend/src/index.js` | Carga `dotenv`, configura Express/CORS y publica las rutas. |
| `backend/src/routes/` | Define las rutas REST. |
| `frontend/src/services/tareas.js` | Solicita operaciones de tareas por HTTP. |
| `frontend/src/services/materias.js` | Obtiene las materias por HTTP. |
| `frontend/src/App.jsx` | Solicita tareas al cargar y actualiza el estado de React. |

## 3. Requisitos y clonación

- Git, VS Code o un editor equivalente y un navegador actualizado.
- Node.js compatible con las dependencias de Vite instaladas; **Node 18.17.1 no funcionó** con Vite 8 en la reproducción. Se verificó la ejecución usando Node 26.13.0.
- Oracle Database XE 21c, con servicio `XEPDB1` activo, y Oracle SQL Developer.

Desde **CMD** en Windows:

```cmd
git clone https://github.com/MJMMiller/GestionDeTareas.git
cd GestionDeTareas
node -v
npm -v
```

Al clonar el repositorio no se descargan las dependencias de `node_modules` ni los archivos `.env` locales; cada integrante debe prepararlos en su computadora.

## 4. Preparar Oracle XE 21c

**4.1 Conexión administrativa.** En SQL Developer, conectarse como `SYSTEM` al servicio `XEPDB1` (host `localhost`, puerto `1521`) y confirmar el contenedor:

```sql
SELECT USER AS USUARIO,
       SYS_CONTEXT('USERENV', 'CON_NAME') AS CONTENEDOR
FROM DUAL;
```

Antes de crear el esquema, verificar que el contenedor sea `XEPDB1`. No ejecutar el DDL de la aplicación dentro de `SYSTEM`.

**4.2 Usuario local y permisos mínimos.** En la conexión administrativa, crear un usuario para el proyecto. Elegir una contraseña propia (no copiar la contraseña de ejemplo del repositorio):

```sql
CREATE USER GESTORTAREAS
  IDENTIFIED BY "REEMPLAZAR_CON_CLAVE_LOCAL_SEGURA"
  DEFAULT TABLESPACE USERS
  TEMPORARY TABLESPACE TEMP
  QUOTA 50M ON USERS;

GRANT CREATE SESSION, CREATE TABLE, CREATE SEQUENCE
TO GESTORTAREAS;
```

Si el usuario ya existe, **no repetir `CREATE USER`**. Revisar los privilegios y asignar únicamente los que falten. No otorgar `DBA` para crear estas tablas.

**4.3 Crear y cargar las tablas.** Crear en SQL Developer una segunda conexión con `GESTORTAREAS`, usando el servicio `XEPDB1`. Ejecutar en este orden, con **F5**:

1. `DB/creacion_tablas.sql` (manteniendo comentadas las instrucciones de creación de usuario y `GRANT DBA` que figuran al principio).
2. `DB/insertar_datos.sql`.

No volver a ejecutar los scripts de creación sobre tablas que ya existen: antes confirmar el estado del esquema.

**4.4 Verificación:**

```sql
SELECT table_name FROM user_tables ORDER BY table_name;
SELECT COUNT(*) AS TOTAL_MATERIAS FROM GDT_MATERIAS;
SELECT COUNT(*) AS TOTAL_TAREAS FROM GDT_TAREAS;
```

La reproducción local de prueba mostró **6 materias y 1 tarea**, según los registros disponibles entonces. Estos números son una referencia de esa carga, no una condición permanente.

## 5. Configurar y ejecutar el backend

En CMD, desde la raíz del repositorio:

```cmd
cd backend
copy .env.example .env
npm ci
npm run dev
```

En `backend/.env`, verificar:

```dotenv
PORT=3000
DB_USER=GESTORTAREAS
DB_PASSWORD=REEMPLAZAR_CON_CLAVE_LOCAL
DB_CONNECT_STRING=localhost:1521/XEPDB1
```

Modificar la contraseña antes de iniciar el servidor; debe coincidir con la del usuario Oracle. **No subir `.env` a Git**. El repositorio ya lo excluye mediante `.gitignore`.

La terminal debería indicar `API en http://localhost:3000`. Esto confirma que Express inició; la conexión con Oracle debe comprobarse aparte.

**Comprobar en el navegador:**

- `http://localhost:3000/api/materias` → arreglo JSON de materias.
- `http://localhost:3000/api/tareas` → arreglo JSON de tareas.

En la reproducción local ambos endpoints devolvieron JSON válido, incluyendo una tarea de ejemplo llamada **Práctica**. Si uno devuelve un objeto `error`, revisar la conexión Oracle antes de continuar.

## 6. Configurar y ejecutar React

En **otra terminal CMD**, desde la raíz:

```cmd
cd frontend
copy .env.example .env
npm ci
npm run dev
```

La ubicación del archivo es fundamental: **`frontend/.env`**, al lado de `frontend/package.json`, **no** dentro de `frontend/src/`.

```dotenv
VITE_API_URL=http://localhost:3000/api
```

Vite muestra la URL del frontend; puede ser `http://localhost:5173` u otro puerto libre (en la reproducción fue `http://localhost:3001`). **El puerto de React no tiene por qué coincidir con el 3000 del backend**.

Si se crea o mueve `.env` mientras Vite está ejecutándose, detener el proceso con `Ctrl + C` y volver a ejecutar `npm run dev` para que lea la variable.

## 7. API REST del proyecto

Rutas revisadas en el código fuente:

| Método | Ruta | Objetivo |
| --- | --- | --- |
| `GET` | `/api/materias` | Listar materias. |
| `GET` | `/api/tareas` | Listar tareas. |
| `POST` | `/api/tareas` | Crear una tarea. |
| `PATCH` | `/api/tareas/:codigo` | Modificar una tarea. |
| `DELETE` | `/api/tareas/:codigo` | Eliminar una tarea. |

**Verificado directamente en la reproducción:** los dos endpoints `GET` devuelven información de Oracle y React muestra la tarea recibida. **Pendiente de evidencia adicional:** ejecutar y registrar casos de crear, editar, completar y eliminar tareas; la presencia de las rutas en el código no prueba por sí sola su comportamiento correcto.

## 8. Registro de errores reales y solución

| Síntoma observado | Diagnóstico | Acción aplicada o recomendada |
| --- | --- | --- |
| `vite no se reconoce` luego de clonar. | Faltaban dependencias locales. | Ejecutar `npm install` o `npm ci` en `frontend`. |
| `EBADENGINE` y `styleText` no exportado por `node:util`. | Node 18.17.1 era incompatible con las versiones instaladas de Vite/Rolldown. | Actualizar Node.js a una versión compatible y reinstalar las dependencias. |
| PowerShell bloquea `npm.ps1`. | Política de ejecución de scripts de PowerShell. | Trabajar con CMD o `npm.cmd` sin cambiar la política del sistema. |
| `Cannot find package 'dotenv'`. | Dependencias del backend no instaladas. | Ejecutar `npm ci` dentro de `backend`. |
| `ORA-01031` al crear `GDT_MATERIAS`. | Privilegios insuficientes para el DDL con columnas `IDENTITY`. | Revisar privilegios de `GESTORTAREAS` con `SYSTEM`, incluido `CREATE SEQUENCE`, sin usar `DBA`. |
| `ORA-00942` en comentarios y clave foránea. | Error en cascada porque la tabla anterior no se creó. | Resolver primero `ORA-01031` y volver a ejecutar el DDL sobre un esquema preparado. |
| `NJS-125: connectString cannot be empty or undefined`. | El backend no cargaba `DB_CONNECT_STRING`. | Crear `backend/.env`, revisar el nombre de la variable y reiniciar Express. |
| En React: `Unexpected token '<' ... is not valid JSON`. | La petición recibía HTML en vez de JSON; `VITE_API_URL` no se estaba cargando desde la ubicación correcta. | Mover `.env` de `frontend/src/` a `frontend/` y reiniciar Vite. |
| React mostraba `0` tareas aunque Oracle tenía registros. | La petición a la API fallaba y la interfaz mantenía la lista vacía. | Confirmar primero `/api/tareas` y la URL de `fetch` en DevTools → Network. |

## 9. Evidencias y verificación pendiente

**Resultados confirmados durante la reproducción:**

- [x] Usuario/esquema Oracle local y tablas `GDT_MATERIAS` / `GDT_TAREAS` creados.
- [x] Datos de prueba consultados en SQL Developer.
- [x] API `GET /api/materias` devuelve JSON con materias.
- [x] API `GET /api/tareas` devuelve JSON con una tarea.
- [x] React muestra **1 tarea**, **1 pendiente**, **0 completadas**.
- [ ] Guardar capturas limpias de SQL Developer, ambas respuestas JSON y la vista React en `docs/evidencias/`.
- [ ] Ejecutar CRUD completo y registrar resultado y fecha de cada caso.
- [ ] Ejecutar al menos tres pruebas automatizadas y adjuntar su resultado.
- [ ] Medir LOC, tamaño del build, rendimiento Lighthouse y horas por integrante.
- [ ] Comprobar rutas de listado/detalle, filtros y despliegue público, conforme a la rúbrica.

## 10. Buenas prácticas para el equipo

- No subir `.env`, contraseñas, tokens ni copias privadas de la base de datos.
- No conceder `DBA` al usuario de la aplicación.
- Ejecutar `git status` antes de `git add` y subir solo los archivos correspondientes al aporte.
- Usar una rama de trabajo y solicitar revisión antes de integrar cambios a `main`.
- Documentar las pruebas efectivamente ejecutadas; no marcar como verificadas funciones que solo aparecen en el código.
- Cuando un integrante actualice el repositorio, ejecutar `git fetch origin` y verificar cambios antes de integrarlos.

## 11. Referencias internas

- [`README.md`](../README.md): investigación general del framework.
- [`backend/doc.md`](../backend/doc.md): contrato de la API y ejemplos de sus métodos.
- [`frontend/INTEGRACION.md`](../frontend/INTEGRACION.md): notas de integración del frontend (revisar su vigencia; contiene referencias a una etapa anterior de persistencia local).
- [`DB/creacion_tablas.sql`](../DB/creacion_tablas.sql): estructura real de Oracle.

**Autoría del aporte:** documentación de reproducción local, diagnóstico de errores y verificación visual de la integración. Este documento no atribuye a su autor la programación original del frontend, backend o diseño de base de datos realizados por el equipo.
