import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Navbar, Nav } from 'react-bootstrap';

function Home() {
  const navigate = useNavigate();

  const handleInicioSesion = () => {
    navigate( '/login' );
  };

  const handleRegister = () => {
    navigate( '/register' );
  };

  return (
    <div
      style={ {
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://source.unsplash.com/1600x900/?technology,sound")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden', // Evita el desplazamiento horizontal
        display: 'flex',
        flexDirection: 'column',
      } }
    >
      {/* Navbar Superior */ }
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
        <Navbar.Brand className="fs-3 fw-bold text-primary">SoundAlertIA</Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="outline-light" className="me-2" onClick={ handleInicioSesion }>
            Iniciar Sesión
          </Button>
          <Button variant="primary" onClick={ handleRegister }>
            Registrarse
          </Button>
        </Nav>
      </Navbar>

      {/* Contenido centrado */ }
      <Container className="d-flex flex-column justify-content-center align-items-center text-center">
        <Card className="shadow-lg border-0 p-4 bg-white bg-opacity-75" style={ { maxWidth: '800px' } }>
          <Card.Body>
            <h1 className="text-primary">Bienvenido a SoundAlertIA</h1>
            <p className="lead text-muted">
              Una aplicación innovadora para personas con pérdida auditiva. Recibe alertas sobre sonidos importantes en tu entorno y transcripciones en tiempo real.
            </p>
            <ul className="list-unstyled text-start">
              <li>🔔 <strong>Notificaciones de sonido:</strong> Timbres, alarmas y más.</li>
              <li>🗣️ <strong>Transcripción en tiempo real:</strong> Convierte conversaciones en texto.</li>
              <li>📱 <strong>Interfaz intuitiva:</strong> Rápida y accesible para todos.</li>
            </ul>
          </Card.Body>
        </Card>

        {/* Sección adicional */ }
        <Container className="mt-4">
          <Row className="justify-content-center">
            <Col md={ 10 }>
              <Card className="shadow-sm border-0 p-4 bg-white bg-opacity-75">
                <Card.Body>
                  <h2 className="text-center text-primary">¿Quiénes Somos?</h2>
                  <p>
                    En <strong>SoundAlertIA</strong>, estamos comprometidos con mejorar la accesibilidad auditiva a través de la tecnología. Creemos en un mundo más inclusivo donde todos puedan interactuar sin barreras.
                  </p>

                  <h3 className="text-center mt-4">Nuestra Misión</h3>
                  <p>
                    Proporcionar herramientas tecnológicas que faciliten la comunicación y la seguridad de las personas con pérdida auditiva.
                  </p>

                  <h3 className="text-center mt-4">Nuestra Visión</h3>
                  <p>
                    Ser la plataforma líder en accesibilidad auditiva, brindando soluciones innovadoras y accesibles para mejorar la calidad de vida de nuestros usuarios.
                  </p>

                  <h3 className="text-center mt-4">Nuestros Valores</h3>
                  <ul className="list-unstyled">
                    <li>💡 <strong>Innovación:</strong> Tecnología al servicio de la accesibilidad.</li>
                    <li>❤️ <strong>Inclusión:</strong> Un mundo sin barreras para todos.</li>
                    <li>📢 <strong>Comunicación:</strong> Conectar a las personas sin importar las diferencias.</li>
                    <li>🎯 <strong>Compromiso:</strong> Mejorar la vida de quienes más lo necesitan.</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default Home;
