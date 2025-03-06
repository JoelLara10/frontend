import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Navbar, Nav, Form } from 'react-bootstrap';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (lockoutTime) {
      const interval = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((lockoutTime - Date.now()) / 1000));
        setTimeLeft(remaining);

        if (remaining === 0) {
          setLockoutTime(null);
          setAttempts(0);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lockoutTime]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (lockoutTime) {
      setErrorMessage(`Demasiados intentos. Espera ${timeLeft} segundos.`);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);

      if (!response.data || !response.data.token || !response.data.user) {
        setErrorMessage('Respuesta inesperada del servidor.');
        return;
      }

      alert('Inicio de sesión exitoso');

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.user.email);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      setUser(response.data.user);

      console.log("Usuario actualizado:", response.data.user);
      navigate('/profile');
    } catch (error) {
      setAttempts(attempts + 1);
      setErrorMessage(error.response?.data?.message || 'Error en el inicio de sesión');

      if (attempts + 1 >= 3) {
        setLockoutTime(Date.now() + 180000); // 3 minutos de bloqueo
        setTimeLeft(180);
        setErrorMessage('Demasiados intentos. Espera 3 minutos.');
      }
    }
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://source.unsplash.com/1600x900/?technology,sound")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Navbar Superior */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
        <Navbar.Brand className="fs-3 fw-bold text-primary">SoundAlertIA</Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="outline-light" className="me-2" onClick={handleHome}>
            Regresar al inicio
          </Button>
        </Nav>
      </Navbar>

      {/* Contenido centrado */}
      <Container className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <Card className="shadow-lg border-0 p-4 bg-white bg-opacity-75" style={{ maxWidth: '400px' }}>
          <Card.Body>
            <h2 className="text-center mb-4 text-primary">Iniciar Sesión</h2>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Ingresa tu correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100" disabled={lockoutTime}>
                {lockoutTime ? `Espera ${timeLeft} s` : 'Ingresar'}
              </Button>
            </Form>

            <p className="mt-3 text-center">
              ¿No tienes una cuenta?{' '}
              <Button variant="link" onClick={() => navigate('/register')}>
                Regístrate
              </Button>
            </p>
            <p className="mt-2 text-center">
              <Button variant="link" onClick={() => navigate('/forgot-password')}>
                ¿Olvidaste tu contraseña?
              </Button>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;