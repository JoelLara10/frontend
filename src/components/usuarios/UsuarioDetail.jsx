import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsuarioDetail = ({ id }) => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/usuarios/${id}`)
            .then(res => setUsuario(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!usuario) return <p>Cargando...</p>;

    return (
        <div>
            <h2>{usuario.nombre} {usuario.apellido_paterno}</h2>
            <p>Email: {usuario.email}</p>
            <p>Rol: {usuario.rol}</p>
        </div>
    );
};

export default UsuarioDetail;
