import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DispositivoItem from './DispositivoItem';
import DispositivoForm from './DispositivoForm';
import './Dispositivos.css';

const DispositivoList = () => {
    const [dispositivos, setDispositivos] = useState([]);
    const [editingDispositivo, setEditingDispositivo] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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
        obtenerDispositivos();
        setEditingDispositivo(null);
        setIsAdding(false);
    };

    const handleCancel = () => {
        setEditingDispositivo(null);
        setIsAdding(false);
    };

    const handleImport = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            await axios.post('http://localhost:5000/api/dispositivos/import-excel', formData);
            obtenerDispositivos();
        } catch (error) {
            console.error('Error al importar dispositivos:', error);
        }
    };

    const handleExport = async () => {
        window.location.href = 'http://localhost:5000/api/dispositivos/export-excel';
    };

    const filteredDispositivos = dispositivos.filter(dispositivo =>
        Object.values(dispositivo).some(value =>
            value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDispositivos = filteredDispositivos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredDispositivos.length / itemsPerPage);

    return (
        <div className="dispositivo-list">
            <h2>Lista de Dispositivos</h2>
            <input
                type="text"
                placeholder="Buscar dispositivo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
            <button className="add-button" onClick={handleAdd}>Agregar Dispositivo</button>
            <input type="file" onChange={handleImport} />
            <button className="export-button" onClick={handleExport}>Exportar a Excel</button>
            </div>
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
                    {currentDispositivos.map(dispositivo => (
                        <DispositivoItem key={dispositivo._id} dispositivo={dispositivo} onDelete={handleDelete} onEdit={handleEdit} />
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        className={currentPage === i + 1 ? 'active' : ''}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DispositivoList;
