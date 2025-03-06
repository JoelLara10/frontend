import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Navbar, Nav, Button, Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/profile.css';

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
        <Nav className="ms-auto d-flex align-items-center">
          {user && (
            <>
              {/* Estilo para separar el nombre del logo */}
              <span className="text-white me-3">{user.nombre}</span>

              {user.rol === 'admin' && (
                <>
                  <Link to="/usuarios">
                    <Button variant="outline-light" className="me-2">
                      Usuarios
                    </Button>
                  </Link>
                  <Link to="/dispositivos">
                    <Button variant="outline-light" className="me-2">
                      Dispositivos
                    </Button>
                  </Link>
                  <Link to="/alertas">
                    <Button variant="outline-light" className="me-2">
                      Alertas
                    </Button>
                  </Link>
                </>
              )}
              <Button variant="danger" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </>
          )}
        </Nav>
      </Navbar>

      {/* Contenedor del perfil */}
      <Container className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
        <Card className="p-4 shadow-lg" style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '15px', maxWidth: '1000px' }}>
          <Card.Body>
            <h2 className="text-center text-primary fw-bold mb-4">Perfil de Usuario</h2>
            {user && (
              <>
                <Row className="mb-3">
                  <Col sm={4} className="fw-bold">ID:</Col>
                  <Col sm={8}>{user.id}</Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4} className="fw-bold">Nombre:</Col>
                  <Col sm={8}>{user.nombre}</Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4} className="fw-bold">Apellido Paterno:</Col>
                  <Col sm={8}>{user.apellido_paterno || 'No disponible'}</Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4} className="fw-bold">Apellido Materno:</Col>
                  <Col sm={8}>{user.apellido_materno || 'No disponible'}</Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4} className="fw-bold">Email:</Col>
                  <Col sm={8}>{user.email}</Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4} className="fw-bold">Fecha de Nacimiento:</Col>
                  <Col sm={8}>{user.fechaNacimiento ? new Date(user.fechaNacimiento).toLocaleDateString() : 'No disponible'}</Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4} className="fw-bold">Rol:</Col>
                  <Col sm={8}>{user.rol}</Col>
                </Row>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Profile;