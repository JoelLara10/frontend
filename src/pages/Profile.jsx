import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/profile.css';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    }

    if (!token || !email) {
      setLoading(false);
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/usuario/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setLoading(false);
      } catch {
        setLoading(false);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="profile-page">
      {user?.rol === 'admin' && (
        <div style={{ marginBottom: "20px", marginRight: "20px", display: "flex", justifyContent: "flex-end" }}>
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
      )}

      {/* 🔹 Botón corregido para cerrar sesión */}
      <button onClick={handleLogout} style={{ background: "red", color: "white", padding: "10px", borderRadius: "5px" }}>
        Cerrar Sesión
      </button>

      <div className="container profile-container">
        <h2>Perfil de Usuario</h2>
        {user && (
          <>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Apellido Paterno:</strong> {user.apellido_paterno || 'No disponible'}</p>
            <p><strong>Apellido Materno:</strong> {user.apellido_materno || 'No disponible'}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Fecha de Nacimiento:</strong> {user.fechaNacimiento ? new Date(user.fechaNacimiento).toLocaleDateString() : 'No disponible'}</p>
            <p><strong>Rol:</strong> {user.rol}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
