import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Usuarios from '../pages/Usuarios';
import Dispositivos from '../pages/Dispositivos';
import Alertas from '../pages/Alertas';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

function AppRoutes( { user, setUser } ) {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/profile" element={ user ? <Profile /> : <Navigate to="/login" /> } />
      {/* Rutas de recuperación de contraseña */ }
      <Route path="/forgot-password" element={ <ForgotPassword /> } />
      <Route path="/reset-password/:token" element={ <ResetPassword /> } />

      {/* Solo accesibles si el usuario es admin */ }
      { user?.rol === 'admin' && (
        <>
          <Route path="/usuarios" element={ <Usuarios /> } />
          <Route path="/dispositivos" element={ <Dispositivos /> } />
          <Route path="/alertas" element={ <Alertas /> } />
        </>
      ) }

      <Route path="*" element={ <Navigate to="/" /> } />
    </Routes>
  );
}

export default AppRoutes;
