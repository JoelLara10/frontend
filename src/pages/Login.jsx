import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = ( { setUser } ) => {
  const [ formData, setFormData ] = useState( { email: '', password: '' } );
  const [ errorMessage, setErrorMessage ] = useState( '' );
  const [ attempts, setAttempts ] = useState( 0 );
  const [ lockoutTime, setLockoutTime ] = useState( null );
  const [ timeLeft, setTimeLeft ] = useState( 0 );
  const navigate = useNavigate();

  useEffect( () => {
    if ( lockoutTime ) {
      const interval = setInterval( () => {
        const remaining = Math.max( 0, Math.ceil( ( lockoutTime - Date.now() ) / 1000 ) );
        setTimeLeft( remaining );

        if ( remaining === 0 ) {
          setLockoutTime( null );
          setAttempts( 0 );
        }
      }, 1000 );

      return () => clearInterval( interval );
    }
  }, [ lockoutTime ] );

  const handleChange = ( e ) => {
    setFormData( { ...formData, [ e.target.name ]: e.target.value } );
  };

  const handleSubmit = async ( e ) => {
    e.preventDefault();
    setErrorMessage( '' );

    if ( lockoutTime ) {
      setErrorMessage( `Demasiados intentos. Espera ${ timeLeft } segundos.` );
      return;
    }

    try {
      const response = await axios.post( 'http://localhost:5000/api/auth/login', formData );

      if ( !response.data || !response.data.token || !response.data.user ) {
        setErrorMessage( 'Respuesta inesperada del servidor.' );
        return;
      }

      alert( 'Inicio de sesión exitoso' );

      localStorage.setItem( 'token', response.data.token );
      localStorage.setItem( 'email', response.data.user.email );
      localStorage.setItem( 'user', JSON.stringify( response.data.user ) );

      setUser( response.data.user );

      console.log( "Usuario actualizado:", response.data.user );
      navigate( '/profile' );
    } catch ( error ) {
      setAttempts( attempts + 1 );
      setErrorMessage( error.response?.data?.message || 'Error en el inicio de sesión' );

      if ( attempts + 1 >= 3 ) {
        setLockoutTime( Date.now() + 180000 ); // 3 minutos de bloqueo
        setTimeLeft( 180 );
        setErrorMessage( 'Demasiados intentos. Espera 3 minutos.' );
      }
    }
  };
  

  return (
    <div className="container">
      <button className="home-button" onClick={ () => navigate( '/' ) }>Inicio</button>
      <h2>Iniciar Sesión</h2>

      { errorMessage && <p className="error-message">{ errorMessage }</p> }

      <form className="login-form" onSubmit={ handleSubmit }>
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={ formData.email }
          onChange={ handleChange }
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={ formData.password }
          onChange={ handleChange }
          required
        />
        <button type="submit" disabled={ lockoutTime }>
          { lockoutTime ? `Espera ${ timeLeft } s` : 'Ingresar' }
        </button>
      </form>

      <p>¿No tienes una cuenta? <button type="button" onClick={ () => navigate( '/register' ) }>Regístrate</button></p>

      <div className="forgot-password">
        <button type="button" onClick={ () => navigate( '/forgot-password' ) }>¿Olvidaste tu contraseña?</button>
      </div>
    </div>
  );
};

export default Login;
