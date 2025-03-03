import React, { useEffect, useState } from "react";
import axios from "axios";
import AlertaForm from "./AlertaForm";
import "./Alertas.css";

const AlertaList = () => {
  const [alertas, setAlertas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAlerta, setEditingAlerta] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchAlertas();
  }, []);

  const fetchAlertas = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/alertas");
      setAlertas(res.data);
    } catch (error) {
      console.error("Error al obtener alertas:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta alerta?")) {
      try {
        await axios.delete(`http://localhost:5000/api/alertas/${id}`);
        setAlertas(prevAlertas => prevAlertas.filter(alerta => alerta._id !== id));
      } catch (error) {
        console.error("Error al eliminar la alerta:", error);
      }
    }
  };

  const handleEdit = (alerta) => {
    setEditingAlerta(alerta);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setEditingAlerta(null);
    setIsAdding(true);
  };

  const handleSave = () => {
    fetchAlertas();
    setEditingAlerta(null);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setEditingAlerta(null);
    setIsAdding(false);
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/alertas/import-excel", formData);
      fetchAlertas();
      alert("Alertas importadas correctamente.");
    } catch (error) {
      console.error("Error al importar alertas:", error);
      alert("Error al importar alertas.");
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/alertas/export-excel", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "alertas.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error al exportar alertas:", error);
    }
  };

  const filteredAlertas = alertas.filter(alerta =>
    Object.values(alerta).some(value =>
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.max(1, Math.ceil(filteredAlertas.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAlertas = filteredAlertas.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <h2>Lista de Alertas</h2>

      <input
        type="text"
        placeholder="Buscar alerta..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
        {!isAdding && !editingAlerta && (
          <>
            <button className="add-button" onClick={handleAdd}>Agregar Alerta</button>
            <input type="file" accept=".xlsx" onChange={handleImport} />
            <button className="export-button" onClick={handleExport}>Exportar a Excel</button>
          </>
        )}
      </div>

      {(isAdding || editingAlerta) && (
        <div>
          <AlertaForm alerta={editingAlerta} onSave={handleSave} />
          <button className="btn btn-cancel" onClick={handleCancel}>Cancelar</button>
        </div>
      )}

      {paginatedAlertas.length === 0 ? (
        <p>No se encontraron alertas.</p>
      ) : (
        <table className="alertas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo de Sonido</th>
              <th>Nivel</th>
              <th>Texto</th>
              <th>Ubicación</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAlertas.map(alerta => (
              <tr key={alerta._id}>
                <td>{alerta._id || "Sin ID"}</td>
                <td>{alerta.tipo_sonido || "No definido"}</td>
                <td>{alerta.nivel_sonido || "No definido"}</td>
                <td>{alerta.texto_icono || "No definido"}</td>
                <td>{alerta.ubicacion || "No definido"}</td>
                <td>{alerta.fecha_hora ? new Date(alerta.fecha_hora).toLocaleDateString() : "No registrada"}</td>
                <td>{alerta.notificacion || "Desconocido"}</td>
                <td>
                  <button className="add-button" onClick={() => handleEdit(alerta)}>Editar</button>
                  <button className="delete-button" onClick={() => handleDelete(alerta._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default AlertaList;
