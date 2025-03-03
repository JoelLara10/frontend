import React from 'react';
import UsuarioList from '../components/usuarios/UsuarioList';
import { Link } from 'react-router-dom';

const Usuarios = () => {
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
        <Link to="/logout">
          <button>Cerrar Sesion</button>
        </Link>
      </div>
      <h1>Gestión de Usuarios</h1>
      <UsuarioList />
    </div>
  );
};

export default Usuarios;
