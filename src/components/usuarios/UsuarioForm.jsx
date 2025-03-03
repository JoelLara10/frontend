import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsuarioForm = ({ usuario, onSave }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        email: '',
        password: '',
        fechaNacimiento: '',
        rol: 'usuario'
    });

    useEffect(() => {
        if (usuario) {
            setFormData({
                nombre: usuario.nombre || '',
                apellido_paterno: usuario.apellido_paterno || '',
                apellido_materno: usuario.apellido_materno || '',
                email: usuario.email || '',
                fechaNacimiento: usuario.fechaNacimiento || '',
                rol: usuario.rol || 'usuario'
            });
        }
    }, [usuario]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (usuario && usuario._id) {
                await axios.put(`http://localhost:5000/api/usuarios/${usuario._id}`, formData);
                alert("Usuario actualizado correctamente");
            } else {
                await axios.post('http://localhost:5000/api/auth/register', formData);
                alert("Usuario agregado correctamente");
            }
            onSave();
        } catch (error) {
            console.error('Error al guardar usuario:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
            <input type="text" name="apellido_paterno" value={formData.apellido_paterno} onChange={handleChange} placeholder="Apellido Paterno" required />
            <input type="text" name="apellido_materno" value={formData.apellido_materno} onChange={handleChange} placeholder="Apellido Materno" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            
            {/* Ocultar password si está editando */}
            {!usuario && <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" required />}
            
            <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />
            <select name="rol" value={formData.rol} onChange={handleChange}>
                <option value="usuario">Usuario</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">{usuario ? 'Actualizar' : 'Registrar'}</button>
        </form>
    );
};

export default UsuarioForm;
