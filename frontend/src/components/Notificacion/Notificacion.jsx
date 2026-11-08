import './Notificacion.css'

function Notificacion({ mensaje, tipo }) {
    return (
        <div className={`notificacion ${tipo}`}>
            {tipo === "exito" ? "" : ""} {mensaje}
        </div>
    );
}

export default Notificacion;