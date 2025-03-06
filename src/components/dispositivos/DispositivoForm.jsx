import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";

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
    <Container className="mt-4">
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <h2 className="text-center">{dispositivo ? "Editar Dispositivo" : "Agregar Dispositivo"}</h2>

        <Form.Group className="mb-3">
          <Form.Label>ID del Dispositivo</Form.Label>
          <Form.Control
            type="text"
            name="dispositivo_id"
            value={formData.dispositivo_id}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ID del Usuario</Form.Label>
          <Form.Control
            type="text"
            name="usuario_id"
            value={formData.usuario_id}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ubicación</Form.Label>
          <Form.Control
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Estado</Form.Label>
          <Form.Select name="estado" value={formData.estado} onChange={handleChange}>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          {dispositivo ? "Actualizar" : "Agregar"}
        </Button>
        {dispositivo && (
          <Button
            variant="secondary"
            type="button"
            className="w-100 mt-3"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default DispositivoForm;
