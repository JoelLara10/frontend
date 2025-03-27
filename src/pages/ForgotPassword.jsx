import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Navbar, Nav } from 'react-bootstrap';

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
    } catch (error) {
      setMessage('');
      setError(error.response?.data?.msg || 'Error al intentar recuperar la contraseña');
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
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
        <Navbar.Brand className="fs-3 fw-bold text-primary">SoundAlertIA</Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="outline-light" onClick={handleInicioSesion}>Regresar</Button>
        </Nav>
      </Navbar>

      {/* Contenido principal */}
      <Container className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: '80vh' }}>
        <Card className="shadow-lg border-0 p-4 bg-white bg-opacity-75" style={{ maxWidth: '500px' }}>
          <Card.Body>
            <h2 className="text-primary">Recuperar Contraseña</h2>
            <p className="text-muted">Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.</p>
            <form onSubmit={handleSubmit} className="w-100">
              <input
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={handleChange}
                required
                className="form-control mb-3"
              />
              <Button type="submit" variant="primary" className="w-100">Enviar Instrucciones</Button>
            </form>
            {message && <p className="text-success mt-3">{message}</p>}
            {error && <p className="text-danger mt-3">{error}</p>}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ForgotPassword;
