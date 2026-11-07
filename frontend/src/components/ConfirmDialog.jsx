import { useState } from "react";

function ConfirmDialog({
    titulo,
    mensaje,
    textoConfirmar = "Eliminar",
    textoExito = "Eliminado correctamente",
    onConfirmar,
    onCancelar,
    onTerminado
}) {

    const [estado, setEstado] = useState("normal");

    const confirmar = async () => {
        setEstado("cargando");

        try {
            await onConfirmar();
            setEstado("exito");

            setTimeout(() => {
                onTerminado();
            }, 1200);

        } catch (error) {
            console.error("Error:", error);
            setEstado("normal");
            alert("No se pudo completar la acción");
        }
    };

    return (
        <div className="dialogo-fondo">
            <div className="dialogo dialogo-confirmar">
                <h3>{titulo}</h3>
                <p>{mensaje}</p>

                <div className="dialogo-botones">
                    {estado === "normal" && (
                        <button type="button" className="btn-cancelar" onClick={onCancelar}>
                            Cancelar
                        </button>
                    )}

                    <button
                        type="button"
                        className={`btn-peligro ${estado}`}
                        onClick={confirmar}
                        disabled={estado !== "normal"}
                    >
                        {estado === "normal" && textoConfirmar}
                        {estado === "cargando" && <span className="spinner"></span>}
                        {estado === "exito" && `${textoExito}`}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog;