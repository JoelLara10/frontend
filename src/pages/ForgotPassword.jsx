import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/forgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleInicioSesion = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/recuperar-password', { email });
      setMessage(response.data.msg);
      setError('');
      // Opcional: Redirigir al usuario a una página de confirmación de que se envió el correo
      // navigate('/confirm-reset');
    } catch (error) {
      setMessage('');
      setError(error.response?.data?.msg || 'Error al intentar recuperar la contraseña');
    }
  };

  return (
    <div className="container">
      <button className="home-button" onClick={handleInicioSesion}>Regresar</button>
      <h2>Recuperar Contraseña</h2>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={handleChange}
          required
        />
        <button type="submit">Enviar Instrucciones</button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ForgotPassword;