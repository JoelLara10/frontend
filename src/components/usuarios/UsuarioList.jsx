import React, { useEffect, useState } from 'react';
import { getUsuarios } from '../../services/usuarioService';
import UsuarioItem from './UsuarioItem';

const UsuarioList = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        getUsuarios().then(data => setUsuarios(data));
    }, []);

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            <ul>
                {usuarios.map(user => (
                    <UsuarioItem key={user.id} user={user} />
                ))}
            </ul>
        </div>
    );
};

export default UsuarioList;
