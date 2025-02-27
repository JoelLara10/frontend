import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [image, setImage] = useState(null);
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

  /*
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert('Selecciona una imagen primero.');
      return;
    }

    const formData = new FormData();
    formData.append('foto_perfil', image);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/auth/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Imagen subida:', response.data);
      setUser((prevUser) => ({
        ...prevUser,
        foto_perfil: response.data.foto_perfil,
      }));
      localStorage.setItem('user', JSON.stringify({ ...user, foto_perfil: response.data.foto_perfil }));
    } catch (error) {
      console.error('Error al subir la foto:', error);
    }
  };
  */

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
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

          {/*
          {user?.foto_perfil && (
            <div>
              <p><strong>Foto de Perfil:</strong></p>
              <img src={`http://localhost:5000${user.foto_perfil}`} alt="Foto de perfil" width="100" height="100" style={{ borderRadius: '50%' }} />
            </div>
          )}
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Actualizar Foto</button>
          */}
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </>
      ) : (
        <p>Error al cargar los datos.</p>
      )}
    </div>
  );
};

export default Profile;
