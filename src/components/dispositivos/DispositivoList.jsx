import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DispositivoItem from './DispositivoItem';
import DispositivoForm from './DispositivoForm';
import './Dispositivos.css';

const DispositivoList = () => {
    const [dispositivos, setDispositivos] = useState([]);
    const [editingDispositivo, setEditingDispositivo] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        obtenerDispositivos();
    }, []);

    const obtenerDispositivos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/dispositivos');
            setDispositivos(response.data);
        } catch (error) {
            console.error('Error al obtener dispositivos:', error.response?.data || error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/dispositivos/${id}`);
            setDispositivos(dispositivos.filter(d => d._id !== id));
        } catch (error) {
            console.error('Error al eliminar dispositivo:', error.response?.data || error);
        }
    };

    const handleEdit = (dispositivo) => {
        setEditingDispositivo(dispositivo);
        setIsAdding(false);
    };

    const handleAdd = () => {
        setEditingDispositivo(null);
        setIsAdding(true);
    };

    const handleSave = () => {
        obtenerDispositivos(); // Recargar la lista después de agregar/editar
        setEditingDispositivo(null);
        setIsAdding(false);
    };

    const handleCancel = () => {
        setEditingDispositivo(null);
        setIsAdding(false);
    };

    return (
        <div className="dispositivo-list">
            <h2>Lista de Dispositivos</h2>

            {!isAdding && !editingDispositivo && (
                <button className="add-button" onClick={handleAdd}>Agregar Dispositivo</button>
            )}

            {(isAdding || editingDispositivo) && (
                <DispositivoForm dispositivo={editingDispositivo} onSave={handleSave} onCancel={handleCancel} />
            )}

            <table className="dispositivo-table">
                <thead>
                    <tr>
                        <th>ID Dispositivo</th>
                        <th>ID Usuario</th>
                        <th>Ubicación</th>
                        <th>Estado</th>
                        <th>Último Reporte</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {dispositivos.map(dispositivo => (
                        <DispositivoItem key={dispositivo._id} dispositivo={dispositivo} onDelete={handleDelete} onEdit={handleEdit} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DispositivoList;