import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Navbar, Nav, Form } from 'react-bootstrap';

const Register = () => {
  const [ formData, setFormData ] = useState( {
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    email: '',
    password: '',
    fechaNacimiento: '',
    rol: 'usuario'
  } );

  const navigate = useNavigate();

  const handleChange = ( e ) => {
    setFormData( { ...formData, [ e.target.name ]: e.target.value } );
  };

  const validateForm = () => {
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if ( !nameRegex.test( formData.nombre ) || !nameRegex.test( formData.apellido_paterno ) || !nameRegex.test( formData.apellido_materno ) ) {
      alert( 'Nombre y apellidos solo deben contener letras.' );
      return false;
    }
    if ( formData.password.length < 6 ) {
      alert( 'La contraseña debe tener al menos 6 caracteres.' );
      return false;
    }
    return true;
  };

  const handleHome = () => {
    navigate( '/' );
  };

  const handleInicioSesion = () => {
    navigate( '/login' );
  };

  const handleSubmit = async ( e ) => {
    e.preventDefault();
    if ( !validateForm() ) return;

    try {
      await axios.post( 'http://localhost:5000/api/auth/register', formData );
      alert( 'Registro exitoso' );
      navigate( '/login' );
    } catch ( error ) {
      alert( error.response?.data?.message || 'Error en el registro' );
    }
  };

  return (
    <div
      style={ {
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://source.unsplash.com/1600x900/?technology,sound")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      } }
    >
      {/* Navbar Superior */ }
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
        <Navbar.Brand className="fs-3 fw-bold text-primary">SoundAlertIA</Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="outline-light" className="me-2" onClick={ handleHome }>Regresar al inicio</Button>
        </Nav>
      </Navbar>

      {/* Contenedor del formulario */ }
      <Container className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <Card className="shadow-lg border-0 p-4 bg-white bg-opacity-75" style={ { maxWidth: '400px' } }>
          <Card.Body>
            <h2 className="text-center mb-4 text-primary fw-bold">Registro</h2>
            <p className="text-center text-muted">Crea tu cuenta para comenzar</p>

            <Form onSubmit={ handleSubmit }>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="nombre" placeholder="Nombre" onChange={ handleChange } required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Apellido Paterno</Form.Label>
                <Form.Control type="text" name="apellido_paterno" placeholder="Apellido Paterno" onChange={ handleChange } required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Apellido Materno</Form.Label>
                <Form.Control type="text" name="apellido_materno" placeholder="Apellido Materno" onChange={ handleChange } required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control type="email" name="email" placeholder="Correo Electrónico" onChange={ handleChange } required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name="password" placeholder="Contraseña" onChange={ handleChange } required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control type="date" name="fechaNacimiento" onChange={ handleChange } required />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">Registrarse</Button>
            </Form>

            <div className="text-center mt-3">
              <p>¿Ya tienes una cuenta? <Button variant="link" onClick={ handleInicioSesion }>Iniciar sesión</Button></p>
            </div>
          </Card.Body>
        </Card>
      </Container >
    </div >
  );
};

export default Register;