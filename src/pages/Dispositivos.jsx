import React from 'react';
import DispositivoList from '../components/dispositivos/DispositivoList';
import { Link } from 'react-router-dom';

const Dispositivos = () => {
  return (
    <div>
      {/* Botones de navegación */ }
      <div style={ { marginBottom: "20px", marginRight: "20px", display: "flex", justifyContent: "flex-end" } }>
        <Link to="/profile">
          <button>Perfil</button>
        </Link>
        <Link to="/usuarios">
          <button>Usuarios</button>
        </Link>
        <Link to="/dispositivos">
          <button>Dispositivos</button>
        </Link>
        <Link to="/alertas">
          <button>Alertas</button>
        </Link>
      </div>
      <h1>Gestión de Dispositivos</h1>
      <DispositivoList />
    </div>
  );
};

export default Dispositivos;