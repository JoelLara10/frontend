import React, { useState, useEffect } from "react";
import axios from "axios";

const DispositivoForm = ({ dispositivo, onSave, onCancel }) => {
  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    dispositivo_id: "",
    usuario_id: "",
    ubicacion: "",
    estado: "activo",
  });

  // Cargar datos en caso de edición
  useEffect(() => {
    if (dispositivo) {
      setFormData({
        dispositivo_id: dispositivo.dispositivo_id || "",
        usuario_id: dispositivo.usuario_id || "",
        ubicacion: dispositivo.ubicacion || "",
        estado: dispositivo.estado || "activo",
      });
    }
  }, [dispositivo]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar usuario_id como ObjectId
    if (!/^[0-9a-fA-F]{24}$/.test(formData.usuario_id)) {
      alert("Error: usuario_id no es un ObjectId válido.");
      return;
    }

    try {
      if (dispositivo) {
        await axios.put(`http://localhost:5000/api/dispositivos/${dispositivo._id}`, formData);
        alert("Dispositivo actualizado correctamente");
      } else {
        await axios.post("http://localhost:5000/api/dispositivos", formData);
        alert("Dispositivo agregado correctamente");
      }
      onSave(); // Llama a la función para actualizar la lista de dispositivos
    } catch (error) {
      console.error("Error al guardar el dispositivo:", error.response?.data || error);
    }
  };

  return (
    <div>
      <h2>{dispositivo ? "Editar Dispositivo" : "Agregar Dispositivo"}</h2>
      <form onSubmit={handleSubmit}>
        <label>ID del Dispositivo:</label>
        <input type="text" name="dispositivo_id" value={formData.dispositivo_id} onChange={handleChange} required />

        <label>ID del Usuario:</label>
        <input type="text" name="usuario_id" value={formData.usuario_id} onChange={handleChange} required />

        <label>Ubicación:</label>
        <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required />

        <label>Estado:</label>
        <select name="estado" value={formData.estado} onChange={handleChange}>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>

        <button type="submit">{dispositivo ? "Actualizar" : "Agregar"}</button>
        {/* {dispositivo && <button type="button" onClick={onCancel}>Cancelar</button>} */}
      </form>
    </div>
  );
};

export default DispositivoForm;
