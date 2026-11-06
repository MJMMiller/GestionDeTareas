import graduationCap from './assets/icons/graduation-cap.svg'
import './App.css'

function App() {
  return (
    <>
      <header>
        <h1>Gestor de tareas</h1>
        <button type="button">Añadir tarea</button>
      </header>

      <main>

        <section className="descripcion">
          <div className="description-icon">
            <img src={graduationCap} alt="Icono de birrete" />
          </div>

          <div className="descripcion-caption">
            <h2>Control de tareas universitarias</h2>
            <p>
              Organiza tus actividades por materia,
              estado y fecha de entrega.
            </p>
          </div>
        </section>

        <section className="resumen">
          <article className="resumen-card">
            <h3>Total de tareas</h3>
            <p>12</p>
          </article>

          <article className="resumen-card">
            <h3>Pendientes</h3>
            <p>8</p>
          </article>

          <article className="resumen-card">
            <h3>Completadas</h3>
            <p>4</p>
          </article>

          <article className="resumen-card">
            <h3>Próximas entregas</h3>
            <p>3</p>
          </article>
        </section>

        <section>
          <h2>Lista de tareas</h2>

          <table>
            <thead>
              <tr>
                <th>Actividad</th>
                <th>Estado</th>
                <th>Fecha de entrega</th>
                <th>Materia</th>
                <th>Notas</th>
                <th>Prioridad</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Práctica 3</td>
                <td>Sin empezar</td>
                <td>6 de noviembre de 2026</td>
                <td>Redes 2</td>
                <td>—</td>
                <td>Media</td>
              </tr>

              <tr>
                <td>Práctica 2</td>
                <td>Sin empezar</td>
                <td>5 de noviembre de 2026</td>
                <td>Redes 2</td>
                <td>—</td>
                <td>Media</td>
              </tr>

              <tr>
                <td>Práctica 1</td>
                <td>En progreso</td>
                <td>3 de noviembre de 2026</td>
                <td>Redes 2</td>
                <td>—</td>
                <td>Media</td>
              </tr>

              <tr>
                <td>Prueba Redes</td>
                <td>Sin empezar</td>
                <td>5 de noviembre de 2026</td>
                <td>Redes 2</td>
                <td>—</td>
                <td>Media</td>
              </tr>

              <tr>
                <td>Api Web Simpsons</td>
                <td>En progreso</td>
                <td>5 de noviembre de 2026</td>
                <td>Programación y Plataformas Web</td>
                <td>—</td>
                <td>Media</td>
              </tr>
            </tbody>
          </table>

          <nav aria-label="Paginación de tareas">
            <p>Mostrando 1 - 5 de 12 tareas</p>

            <button type="button">Anterior</button>
            <button type="button">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
            <button type="button">Siguiente</button>
          </nav>
        </section>

      </main>

      <footer className="pie-pagina">
        <p className="pie-pagina-titulo">Gestor de tareas</p>
        <small>POWERED BY REACT</small>
      </footer>
    </>
  )
}

export default App
