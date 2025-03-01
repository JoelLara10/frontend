import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AlertaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ alerta, setAlerta ] = useState( null );

  useEffect( () => {
    const fetchAlerta = async () => {
      try {
        const res = await axios.get( `http://localhost:5000/api/alertas/${ id }` );
        setAlerta( res.data );
      } catch ( error ) {
        console.error( "Error al obtener la alerta:", error );
      }
    };
    fetchAlerta();
  }, [ id ] );

  if ( !alerta ) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Detalle de la Alerta</h2>
      <p><strong>Tipo:</strong> { alerta.tipo_sonido }</p>
      <p><strong>Nivel:</strong> { alerta.nivel_sonido }</p>
      <p><strong>Ubicación:</strong> { alerta.ubicacion }</p>
      <button onClick={ () => navigate( "/alertas" ) }>⬅ Volver</button>
    </div>
  );
};

export default AlertaDetail;
