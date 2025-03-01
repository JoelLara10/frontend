import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DispositivoDetail = ({ id }) => {
    const [dispositivo, setDispositivo] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/dispositivos/${id}`)
            .then(res => setDispositivo(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!dispositivo) return <p>Cargando...</p>;

    return (
        <div>
            <h2>ID: {dispositivo.dispositivo_id}</h2>
            <p>Ubicación: {dispositivo.ubicacion}</p>
            <p>Estado: {dispositivo.estado}</p>
            <p>Última actualización: {new Date(dispositivo.ultima_reporte).toLocaleString()}</p>
        </div>
    );
};

export default DispositivoDetail;
