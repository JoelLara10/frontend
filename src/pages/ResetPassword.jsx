import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/resetPassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/auth/reset-password`, { token, password });
      setMessage(response.data.msg);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError('Error al restablecer la contraseña');
    }
  };

  return (
    <form className="reset-password-form" onSubmit={handleSubmit}>
      <input type="password" placeholder="Nueva Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="password" placeholder="Confirmar Nueva Contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      <button type="submit">Restablecer Contraseña</button>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default ResetPassword;
