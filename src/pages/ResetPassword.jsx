import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Navbar, Nav, Button } from 'react-bootstrap';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleInicioSesion = () => {
    navigate('/login');
  };

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
    <div
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://source.unsplash.com/1600x900/?technology,sound")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4 w-100">
        <Navbar.Brand className="fs-3 fw-bold text-primary">SoundAlertIA</Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="outline-light" className="me-2" onClick={handleInicioSesion}>
            Iniciar Sesión
          </Button>
        </Nav>
      </Navbar>

      <Container className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: '80vh' }}>
        <Card className="shadow-lg border-0 p-4 bg-white bg-opacity-75" style={{ maxWidth: '500px' }}>
          <Card.Body>
            <h2 className="text-primary">Restablecer Contraseña</h2>
            <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
              <input
                type="password"
                className="form-control"
                placeholder="Nueva Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-control"
                placeholder="Confirmar Nueva Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button variant="primary" type="submit">
                Restablecer Contraseña
              </Button>
            </form>
            {message && <p className="text-success mt-3">{message}</p>}
            {error && <p className="text-danger mt-3">{error}</p>}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ResetPassword;
