import './App.css'

function App() {
  return (
    <>
      <header>
        <h1>Gestor de tareas</h1>
        <button type="button">Añadir tarea</button>
      </header>

      <body>
        <section>
          <h3>Lista de tareas</h3>
          <ul>
            <li>Tarea 1</li>
            <li>Tarea 2</li>
            <li>Tarea 3</li>
          </ul>
        </section>

        <section>
          <h3>Filtros</h3>
          <label htmlFor="materia">Materia:</label>
          <select id="materia">
            <option value="todas">Todas</option>
            <option value="matematicas">Matemáticas</option>
            <option value="programacion">Programación</option>
          </select>
          
          <label htmlFor="estado">Estado:</label>
          <select id="estado">
            <option value="todas">Todas</option>
            <option value="pendiente">Pendiente</option>
            <option value="completada">Completada</option>
          </select>
          
          <label htmlFor="fecha">Fecha de entrega:</label>
          <input type="date" id="fecha" />
        </section>
      </body>
      <main>
        <h2>Control de tareas universitarias</h2>
        <p>
          Organiza tus actividades por materia, estado y fecha de entrega.
        </p>
      </main>
    </>
  )
}

export default App