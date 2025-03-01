import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AlertaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alerta, setAlerta] = useState({
    tipo_sonido: "",
    nivel_sonido: "",
    texto_icono: "",
    dispositivo_id: "",
    ubicacion: "",
    notificacion: "pendiente",
  });

  useEffect(() => {
    if (id) {
      const fetchAlerta = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/alertas/${id}`);
          setAlerta(res.data);
        } catch (error) {
          console.error("Error al obtener la alerta:", error);
        }
      };
      fetchAlerta();
    }
  }, [id]);

  const handleChange = (e) => {
    setAlerta({ ...alerta, [e.target.name]: e.target.value });
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/alertas/${id}`, alerta);
        alert("Alerta actualizada correctamente");
      } else {
        await axios.post("http://localhost:5000/api/alertas", alerta);
        alert("Alerta agregada correctamente");
      }
      navigate("/alertas");
    } catch (error) {
      console.error("Error al guardar la alerta:", error);
      alert("Error al guardar la alerta");
    }
  };

  return (
    <form onSubmit={handleGuardar}>
      <h2>{id ? "Editar Alerta" : "Nueva Alerta"}</h2>
      <input type="text" name="tipo_sonido" value={alerta.tipo_sonido} onChange={handleChange} placeholder="Tipo de sonido" required />
      <input type="text" name="nivel_sonido" value={alerta.nivel_sonido} onChange={handleChange} placeholder="Nivel de sonido" required />
      <input type="text" name="texto_icono" value={alerta.texto_icono} onChange={handleChange} placeholder="Texto Icono" required />
      <input type="text" name="dispositivo_id" value={alerta.dispositivo_id} onChange={handleChange} placeholder="ID del dispositivo" required />
      <input type="text" name="ubicacion" value={alerta.ubicacion} onChange={handleChange} placeholder="Ubicación" required />
      <button type="submit">{id ? "Actualizar" : "Guardar"}</button>
      <button type="button" onClick={() => navigate("/alertas")} style={{ marginLeft: "10px" }}>Cancelar</button>
    </form>
  );
};

export default AlertaForm;
