import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleInicioSesion = () => {
    navigate('/login');
  };
  
  const handleRegister = () => {
    navigate('/register'); // Redirige a la página de registro
  };
  
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Bienvenido a SoundAlertIA</h1>
      <p>Por favor, inicia sesión o regístrate para continuar.</p>
      <div>
        <button style={{ marginRight: '10px' }} onClick={handleInicioSesion}>Iniciar Sesión</button>
        <button onClick={handleRegister}>Registrarse</button>
      </div>
    </div>
  );
}

export default Home;