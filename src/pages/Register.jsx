import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    email: '',
    password: '',
    fechaNacimiento: '',
    rol: 'usuario'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!nameRegex.test(formData.nombre) || !nameRegex.test(formData.apellido_paterno) || !nameRegex.test(formData.apellido_materno)) {
      alert('Nombre y apellidos solo deben contener letras.');
      return false;
    }
    if (formData.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }
    return true;
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleInicioSesion = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Registro exitoso');
      navigate('/login');
    } catch (error) {
      alert(error.response.data.message || 'Error en el registro');
    }
  };

  return (
    <div className="container">
      <button className="home-button" onClick={handleHome}>Inicio</button>
      <h2>Registro</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <input type="text" name="apellido_paterno" placeholder="Apellido Paterno" onChange={handleChange} required />
        <input type="text" name="apellido_materno" placeholder="Apellido Materno" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <input type="date" name="fechaNacimiento" onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
      <p>¿Ya tienes una cuenta? <button type="button" onClick={handleInicioSesion}>Iniciar sesión</button></p>
    </div>
  );
};

export default Register;