import { useState } from 'react';

function TaskItem({nombre, estado, fecha, materia, nota, prioridad}) {
    const [tachado, setTachado] = useState(false);

    const estilo = {
        textDecoration: tachado ? 'line-through' : 'none'
    };

    return (
        <tr style={estilo}>
            <td className="casillaMarcarEstado">
                <input
                    type="checkbox"
                    className="marcarEstado"
                    checked={tachado}
                    onChange={(e) => setTachado(e.target.checked)}
                />
            </td>
            <td>{nombre}</td>
            <td>{estado}</td>
            <td>{fecha}</td>
            <td>{materia}</td>
            <td>{nota}</td>
            <td>{prioridad}</td>
        </tr>
    );
}

export default TaskItem;