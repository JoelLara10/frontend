import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Alertas.css";

const AlertaList = () => {
  const [alertas, setAlertas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/alertas");
        setAlertas(res.data);
      } catch (error) {
        console.error("Error al obtener alertas:", error);
      }
    };
    fetchAlertas();
  }, []);

  // Función para ver detalles de la alerta
  const handleVer = (id) => {
    navigate(`/alertas/${id}`);
  };

  // Función para editar alerta
  const handleEditar = (id) => {
    navigate(`/alertas/editar/${id}`);
  };

  // Función para eliminar alerta
  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta alerta?")) {
      try {
        await axios.delete(`http://localhost:5000/api/alertas/${id}`);
        setAlertas(alertas.filter(alerta => alerta._id !== id)); // Actualiza la lista
      } catch (error) {
        console.error("Error al eliminar la alerta:", error);
      }
    }
  };

  return (
    <div className="alertas-container">
      <h2>Lista de Alertas</h2>
      <button className="btn btn-ver" onClick={() => navigate("/alertas/nueva")}>
        Agregar Alerta
      </button>
      <table className="alertas-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de Sonido</th>
            <th>Nivel</th>
            <td>Texto</td>
            <th>Ubicación</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alertas.map((alerta) => (
            <tr key={alerta._id}>
              <td>{alerta._id || "Sin ID"}</td>
              <td>{alerta.tipo_sonido || "No definido"}</td>
              <td>{alerta.nivel_sonido || "No definido"}</td>
              <td>{alerta.texto_icono || "No definido"}</td>
              <td>{alerta.ubicacion || "No definido"}</td>
              <td>{alerta.fecha_hora ? new Date(alerta.fecha_hora).toLocaleDateString() : "No registrada"}</td>
              <td>{alerta.notificacion || "Desconocido"}</td>
              <td>
                {/* <button className="btn btn-ver" onClick={() => handleVer(alerta._id)}>👁 Ver</button> */}
                <button className="btn btn-editar" onClick={() => handleEditar(alerta._id)}>Editar</button>
                <button className="btn btn-eliminar" style={{ backgroundColor: 'red' }} onClick={() => handleEliminar(alerta._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertaList;
