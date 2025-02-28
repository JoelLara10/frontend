import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      console.error('Token o email no encontrado en localStorage');
      setError('No se encontró un token o email de usuario.');
      setLoading(false);
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/usuario/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.data || !response.data.user) {
          throw new Error('Datos del usuario no encontrados');
        }

        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener los datos del usuario:', err);
        setError('Error al cargar los datos del usuario.');
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
        <div className="admin-buttons">
          <h3>Opciones de Administrador</h3>
          <button onClick={() => navigate('/usuarios')}>Gestionar Usuarios</button>
          <button onClick={() => navigate('/dispositivos')}>Gestionar Dispositivos</button>
          <button onClick={() => navigate('/alertas')}>Gestionar Alertas</button>
        </div>
      )}

      <div className="container profile-container">
        <h2>Perfil de Usuario</h2>
        {error ? (
          <p>{error}</p>
        ) : user ? (
          <>
            <p><strong>ID:</strong> {user?.id}</p>
            <p><strong>Nombre:</strong> {user?.nombre}</p>
            <p><strong>Apellido Paterno:</strong> {user?.apellido_paterno || 'No disponible'}</p>
            <p><strong>Apellido Materno:</strong> {user?.apellido_materno || 'No disponible'}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Fecha de Nacimiento:</strong> {user?.fechaNacimiento ? new Date(user.fechaNacimiento).toLocaleDateString() : 'No disponible'}</p>
            <p><strong>Rol:</strong> {user?.rol}</p>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </>
        ) : (
          <p>Error al cargar los datos.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
