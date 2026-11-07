# Gestor de tareas con React

## Integrantes
- Mateo Miller
- Daniel Durán
- Jonnathan Saavedra
- Nicolás Cedillo

---

## Investigación sobre React

### Panorama

#### Origen
Fue creado en el año 2013 por Jordan Walke, quien trabajaba en Facebook. Su objetivo era crear interfaces de usuario dinámicas y reutilizables. 

#### Quien lo mantiene
Es mantenido por **React team** y por desarrolles de la comunidad de código abierto

#### Versión
Actualmente se encuentra en la versión 19 

#### Licencia
Tiene la MIT License y es de código abierto

#### Filosofía
Como biblioteca, se basa en estos principios:
1. Declarativa: describe como se ve la interfaz de acuerdo a datos
2. Componentes: piezas de código reutilizables
3. Unidireccional: datos van de componentes padres a hijos mediante propiedades
4. Basado en estados: la interfaz cambia cuando se alteran los datos


### Instalación

#### Creación del proyecto
Primero tenemos que tener instalado `npm` y `node`. Para luego ejecutar
```bash
npm create vite@latest nombre -- --template react
```

#### Estructura 
![](assets/estructura_react.png)
| Fichero | Función |
| :--- | :--- |
| `node-modules` | Dependencias y bibliotecas instaladas|
| `public` | Guarda archivos estáticos |
| `src` | Código fuente de la aplicación |
| `index.html`| HTML donde se ejecuta react |
| `package.json` | Información del proyecto |
| `vite.config.js` | Configuración de Vite |


### Componentes

Los **componentes** permiten dividir una interfaz de usuario en partes independientes y reutilizables. 

**JSX** (JavaScript XML) es una extensión de JavaScript que permite escribir estructuras similares a HTML dentro del código JavaScript.

Las **props** son datos que un componente recibe desde su componente padre. Permiten reutilizar componentes enviándoles información diferente.

Se permite responder a las interacciones del usuario mediante manejadores de **eventos**.

El **renderizado condicional** permite mostrar diferentes elementos de la interfaz dependiendo de una condición.

React permite representar **listas** de elementos utilizando métodos de JavaScript como `map()`

Los componentes tienen un **ciclo de vida** que describe las diferentes etapas por las que pasan durante su funcionamiento.

### Estado y reactividad
La **reactividad** es la capacidad de React para actualizar la interfaz cuando cambian los datos que utiliza un componente.

#### Hooks
Son funciones especiales de React que permiten utilizar características como el estado, los efectos secundarios y el contexto dentro de componentes funcionales.Por ejemplo: 
- `useState`:Permite almacenar y actualizar el estado de un componente.
- `useEffect`:Permite ejecutar efectos secundarios.
- `useContext`:Permite acceder a información compartida mediante Context.
- `useRef`:Permite conservar referencias a elementos y valores entre renderizados.
- `useReducer`:Permite administrar estados mediante una función reductora.
- `useMemo`:Permite memorizar resultados de cálculos.
- `useCallback`:Permite memorizar funciones.

### Rutas y API
El **enrutamiento** permite navegar entre diferentes páginas o vistas de una aplicación sin tener que recargar completamente el documento HTML.

React puede comunicarse con servidores externos para obtener, enviar, modificar o eliminar información. Para esto usamos `fetch()

### Pruebas
Las pruebas permiten comprobar que los componentes y funcionalidades de una aplicación funcionan correctamente.

Herramientas de pruebas
|Herramienta| Función|
|----|---|
|Vitest	|Ejecuta pruebas unitarias y de integración.|
|Jest|Permite realizar pruebas automatizadas de JavaScript y React.|
|React Testing Library|Facilita las pruebas de componentes desde la perspectiva del usuario.|

### Ecosistema y despliegue
React no proporciona una CLI oficial para generar proyectos y administrar toda su estructura.

Para crear proyectos se utilizan herramientas externas como **Vite**. También se pueden utilizar otras herramientas compatibles con React.

- *React*: biblioteca para construir interfaces.
- *Vite*: herramienta de desarrollo y construcción.
- *npm*: administrador de paquetes.

---

## Métricas

| Métrica | Resultado |
| :--- | :--- |
| Tiempo de configuración inicial (min) | 5 min |
| Líneas de código de la app (LOC) | `npx cloc src` nos da  |
| Tamaño del build de producción (KB) | Carpeta `dist` tras el build |
| Puntaje de rendimiento Lighthouse | Chrome DevTools, modo móvil |

Horas totales del grupo:
- Mateo Miller:
- Jonnathan Saavedra
- Daniel Durán:
- Nicolás Cedillo:

---

## Documentación técnica

- [Guía de instalación y conexión React–Oracle](docs/GUIA_INSTALACION_Y_CONEXION.md)

## Uso de IA 

Cuaderno de NotebookLM: [dar click aquí para abrir el link](https://notebook.google.com/notebook/20b92080-224d-46a7-b0bc-4e0a6c3e1ae9)

### Declaración de uso

Usamos esta IA para ...
