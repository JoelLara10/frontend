import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { useState } from 'react';
import './styles/global.css';

function App() {
  const [user, setUser] = useState(null); // El usuario solo se mantiene en la sesión actual

  return (
    <Router>
      <Routes>
        {/* Página de inicio */}
        <Route path="/" element={<Home />} />

        {/* Manejo de autenticación */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />

        {/* Rutas de recuperación de contraseña */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;