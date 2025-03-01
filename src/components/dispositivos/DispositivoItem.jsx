import React from 'react';

const DispositivoItem = ({ dispositivo, onDelete, onEdit }) => {
    return (
        <tr>
            <td>{dispositivo.dispositivo_id}</td>
            <td>{dispositivo.usuario_id ? dispositivo.usuario_id.nombre : 'Sin usuario'}</td>
            <td>{dispositivo.ubicacion}</td>
            <td>{dispositivo.estado}</td>
            <td>{new Date(dispositivo.ultima_reporte).toLocaleString()}</td>
            <td>
                <button style={{ backgroundColor: 'green', color: 'white', marginRight: '5px' }} onClick={() => onEdit(dispositivo)}>
                    Editar
                </button>
                <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => onDelete(dispositivo._id)}>
                    Eliminar
                </button>
            </td>
        </tr>
    );
};

export default DispositivoItem;
