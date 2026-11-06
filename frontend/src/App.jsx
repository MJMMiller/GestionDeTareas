import { useEffect, useState } from 'react'
import { verificarSalud } from './services/api'

function App() {
  const [estado, setEstado] = useState('cargando')
  const [error, setError] = useState('')

  useEffect(() => {
    verificarSalud()
      .then(() => setEstado('ok'))
      .catch((err) => {
        setEstado('error')
        setError(err.message)
      })
  }, [])

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Gestor de Tareas</h1>
      {estado === 'cargando' && <p>Conectando con la API...</p>}
      {estado === 'ok' && <p>✅ API y base de datos conectadas</p>}
      {estado === 'error' && <p>❌ Sin conexión con la API: {error}</p>}
    </main>
  )
}

export default App
