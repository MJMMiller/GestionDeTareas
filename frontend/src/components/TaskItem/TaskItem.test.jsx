import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import TaskItem from './TaskItem'

const tarea = {
  ID: 1,
  ACTIVIDAD: 'Estudiar React',
  ESTADO: 'P',
  FECHA: '2026-11-10',
  MATERIA: 'Estándares Web',
  DESCRIPCION: 'Leer la documentación',
  PRIORIDAD: 'A'
}

function dibujarFila(propsExtra = {}) {
  const props = {
    tarea,
    onCompletar: () => {},
    onEditar: () => {},
    onEliminar: () => {},
    ...propsExtra
  }
  return render(
    <table>
      <tbody>
        <TaskItem {...props} />
      </tbody>
    </table>
  )
}

describe('TaskItem', () => {
  it('muestra los datos de la tarea', () => {
    dibujarFila()

    expect(screen.getByText('Estudiar React')).toBeInTheDocument()
    expect(screen.getByText('Sin empezar')).toBeInTheDocument() 
    expect(screen.getByText('Estándares Web')).toBeInTheDocument()
    expect(screen.getByText('Alta')).toBeInTheDocument()         
  })

  it('llama a onCompletar con la tarea al marcar el checkbox', async () => {
    const onCompletar = vi.fn()
    dibujarFila({ onCompletar })

    await userEvent.click(screen.getByRole('checkbox'))

    expect(onCompletar).toHaveBeenCalledWith(tarea)
  })

  it('llama a onEditar y onEliminar con la tarea al pulsar sus botones', async () => {
    const onEditar = vi.fn()
    const onEliminar = vi.fn()
    dibujarFila({ onEditar, onEliminar })

    await userEvent.click(screen.getByTitle('Editar'))
    await userEvent.click(screen.getByTitle('Eliminar'))

    expect(onEditar).toHaveBeenCalledWith(tarea)
    expect(onEliminar).toHaveBeenCalledWith(tarea)
  })

  it('muestra la tarea como finalizada cuando su estado es F', () => {
    dibujarFila({ tarea: { ...tarea, ESTADO: 'F' } })

    expect(screen.getByText('Finalizada')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toBeChecked()
  })
})