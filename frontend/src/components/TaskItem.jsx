function TaskItem({nombre, estado, fecha, materia, nota, prioridad}){
    return(
        <tr>
            <td className="casillaMarcarEstado">
                <input type="checkbox" className="marcarEstado"></input>
                <label for="estado"></label>
            </td>
            <td>{nombre}</td>
            <td>{estado}</td>
            <td>{fecha}</td>
            <td>{materia}</td>
            <td>{nota}</td>
            <td>{prioridad}</td>
        </tr>
    )

}

export default TaskItem;