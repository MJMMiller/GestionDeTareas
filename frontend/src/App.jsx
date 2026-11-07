import { useState, useEffect } from 'react'
import graduationCap from './assets/icons/graduation-cap.svg'
import logsIcon from './assets/icons/logs.svg'
import clockIcon from './assets/icons/clock.svg'
import checkIcon from './assets/icons/circle-check.svg'
import TareaForm from './components/TareaForm'
import TablaTareas from './components/TablaTareas'
import ConfirmDialog from './components/ConfirmDialog'
import Notificacion from './components/Notificacion'
import Paginacion from './components/Paginacion'
import { listarTareas, actualizarTarea, eliminarTarea } from './services/tareas'

import './App.css'

function App() {

  const [tareas, setTareas] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [tareaEditar, setTareaEditar] = useState(null)
  const [tareaEliminar, setTareaEliminar] = useState(null)
  const [notificacion, setNotificacion] = useState(null)
  const [pagina, setPagina] = useState(1)

  const cargarTareas = async () => {
    try {
      const data = await listarTareas()
      setTareas(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    cargarTareas()
  }, [])

  const mostrarNotificacion = (mensaje, tipo) => {
    setNotificacion({ mensaje, tipo })
    setTimeout(() => setNotificacion(null), 3000)
  }

  const abrirNueva = () => {
    setTareaEditar(null)
    setMostrarFormulario(true)
  }

  const abrirEditar = (tarea) => {
    setTareaEditar(tarea)
    setMostrarFormulario(true)
  }

  const cerrarFormulario = () => {
    setMostrarFormulario(false)
    setTareaEditar(null)
  }

  const tareaGuardada = (mensaje) => {
    cerrarFormulario()
    cargarTareas()
    mostrarNotificacion(mensaje, 'exito')
  }

  const errorAlGuardar = (mensaje) => {
    cerrarFormulario()
    mostrarNotificacion(mensaje, 'error')
  }

  const completarTarea = async (tarea) => {
    const nuevoEstado = tarea.ESTADO === 'F' ? 'P' : 'F'

    try {
      await actualizarTarea(tarea.CODIGO, { estado: nuevoEstado })
      cargarTareas()
      mostrarNotificacion(
        nuevoEstado === 'F' ? 'Tarea completada' : 'Tarea marcada como pendiente',
        'exito'
      )
    } catch (error) {
      console.error('Error:', error)
      mostrarNotificacion('No se pudo cambiar el estado', 'error')
    }
  }

  const confirmarEliminar = async () => {
    try {
      await eliminarTarea(tareaEliminar.CODIGO)
      cargarTareas()
      mostrarNotificacion('Tarea eliminada correctamente', 'exito')
    } catch (error) {
      console.error('Error:', error)
      mostrarNotificacion('No se pudo eliminar la tarea', 'error')
    }
    setTareaEliminar(null)
  }

  const pendientes = tareas.filter((t) => t.ESTADO === 'P').length
  const completadas = tareas.filter((t) => t.ESTADO === 'F').length

  const POR_PAGINA = 5
  const totalPaginas = Math.max(1, Math.ceil(tareas.length / POR_PAGINA))
  const paginaActual = Math.min(pagina, totalPaginas)
  const inicio = (paginaActual - 1) * POR_PAGINA
  const tareasPagina = tareas.slice(inicio, inicio + POR_PAGINA)

  return (
    <>
      <header>
        <img className="logo-icon" src={graduationCap} alt="Logo Gestor" />
        <h1>Gestor</h1>
        <p>Tareas Universitarias</p>
        <button type="button" onClick={abrirNueva}>
          Añadir tarea
        </button>
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

          <article className="resumen-card" id='card-total'>
            <div className='resumen-card-icon' id='img-total'>
              <img src={logsIcon} alt="Icono de tareas" />
            </div>
            <div className='resumen-card-caption'>
              <h3>Total de tareas</h3>
              <p>{tareas.length}</p>
            </div>
          </article>

          <article className="resumen-card" id='card-pendientes'>
            <div className='resumen-card-icon' id='img-pendientes'>
              <img src={clockIcon} alt="Icono de reloj" />
            </div>
            <div className='resumen-card-caption'>
              <h3>Pendientes</h3>
              <p>{pendientes}</p>
            </div>
          </article>

          <article className="resumen-card" id='card-completadas'>
            <div className='resumen-card-icon' id='img-completadas'>
              <img src={checkIcon} alt="Icono de tareas completadas" />
            </div>
            <div className='resumen-card-caption'>
              <h3>Completadas</h3>
              <p>{completadas}</p>
            </div>
          </article>

        </section>

        <section className="lista-tareas" aria-labelledby="titulo-tareas">
          <h2 id="titulo-tareas">Lista de tareas</h2>

          <div className="tabla-contenedor">
            <TablaTareas
              tareas={tareasPagina}
              onCompletar={completarTarea}
              onEditar={abrirEditar}
              onEliminar={setTareaEliminar}
            />
          </div>

          {tareas.length > 0 && (
            <Paginacion
              pagina={paginaActual}
              totalPaginas={totalPaginas}
              desde={inicio + 1}
              hasta={inicio + tareasPagina.length}
              total={tareas.length}
              onCambiar={setPagina}
            />
          )}
        </section>

      </main>

      {mostrarFormulario && (
        <div className="dialogo-fondo">
          <div className="dialogo">
            <div className="dialogo-encabezado">
              <h3>{tareaEditar ? 'Editar tarea' : 'Nueva tarea'}</h3>
              <button type="button" onClick={cerrarFormulario}>
                ✕
              </button>
            </div>

            <TareaForm
              tarea={tareaEditar}
              onGuardado={tareaGuardada}
              onError={errorAlGuardar}
            />
          </div>
        </div>
      )}

      {tareaEliminar && (
        <ConfirmDialog
          titulo="¿Eliminar tarea?"
          mensaje={`Se eliminará "${tareaEliminar.ACTIVIDAD}". Esta acción no se puede deshacer.`}
          onConfirmar={confirmarEliminar}
          onCancelar={() => setTareaEliminar(null)}
        />
      )}

      {notificacion && (
        <Notificacion mensaje={notificacion.mensaje} tipo={notificacion.tipo} />
      )}

      <footer className="pie-pagina">
        <p className="pie-pagina-titulo">Gestor de tareas</p>
        <small>POWERED BY REACT</small>
      </footer>
    </>
  )
}

export default App