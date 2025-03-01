import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsuarioForm from './UsuarioForm';

const UsuarioList = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const obtenerUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/usuarios/${id}`);
            setUsuarios(usuarios.filter(u => u._id !== id));
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
        }
    };

    const handleEdit = (usuario) => {
        setEditingUser(usuario);
        setIsAdding(false);
    };

    const handleAdd = () => {
        setEditingUser(null);
        setIsAdding(true);
    };

    const handleSave = () => {
        obtenerUsuarios();
        setEditingUser(null);
        setIsAdding(false);
    };

    const handleCancel = () => {
        setEditingUser(null);
        setIsAdding(false);
    };

    return (
        <div>
            <h2>Lista de Usuarios</h2>

            {!isAdding && !editingUser && (
                <button className="btn btn-add" onClick={handleAdd}>Agregar Usuario</button>
            )}

            {(isAdding || editingUser) && (
                <div>
                    <UsuarioForm usuario={editingUser} onSave={handleSave} />
                    <button className="btn btn-cancel" onClick={handleCancel}>Cancelar</button>
                </div>
            )}

            <table className="usuarios-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>Email</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Rol</th>
                        <th>Intentos</th>
                        <th>Bloqueo Hasta</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario._id}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellido_paterno}</td>
                            <td>{usuario.apellido_materno}</td>
                            <td>{usuario.email}</td>
                            <td>{new Date(usuario.fechaNacimiento).toLocaleDateString()}</td>
                            <td>{usuario.rol}</td>
                            <td>{usuario.intentos}</td>
                            <td>{usuario.bloqueo_hasta ? new Date(usuario.bloqueo_hasta).toLocaleDateString() : 'N/A'}</td>
                            <td>
                                <button className="btn btn-edit" onClick={() => handleEdit(usuario)}>Editar</button>
                                <button className="btn btn-delete" style={{ backgroundColor: 'red' }} onClick={() => handleDelete(usuario._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsuarioList;
