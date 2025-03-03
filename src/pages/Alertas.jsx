import React from 'react';
import AlertaList from '../components/alertas/AlertaList';
import { Link } from 'react-router-dom';

const Alertas = () => {
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
        <Link to="/login">
          <button>Cerrar Sesión</button>
        </Link>
      </div>
      <h1>Gestión de Alertas</h1>
      <AlertaList />
    </div>
  );
};

export default Alertas;