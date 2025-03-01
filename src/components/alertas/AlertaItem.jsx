import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AlertaItem = ({ alerta, setAlertas }) => {
  const navigate = useNavigate();

  const handleEliminar = async () => {
    if (window.confirm("¿Seguro que deseas eliminar esta alerta?")) {
      try {
        await axios.delete(`http://localhost:5000/api/alertas/${alerta._id}`);
        setAlertas((prev) => prev.filter((a) => a._id !== alerta._id));
      } catch (error) {
        console.error("Error al eliminar la alerta:", error);
      }
    }
  };

  return (
    <tr>
      <td>{alerta.tipo_sonido}</td>
      <td>{alerta.nivel_sonido}</td>
      <td>{alerta.ubicacion}</td>
      <td>
        <button className="btn btn-ver" onClick={() => navigate(`/alertas/${alerta._id}`)}>👁 Ver</button>
        <button className="btn btn-editar" onClick={() => navigate(`/alertas/editar/${alerta._id}`)}>✏ Editar</button>
        <button className="btn btn-eliminar" onClick={handleEliminar}>🗑 Eliminar</button>
      </td>
    </tr>
  );
};

export default AlertaItem;
