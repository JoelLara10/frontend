import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import './App.css';
import { useEffect } from 'react';

function App() {
  const [ user, setUser ] = useState( null );

  useEffect( () => {
    const storedUser = localStorage.getItem( 'user' );
    if ( storedUser ) {
      setUser( JSON.parse( storedUser ) );
    }
  }, [] );

  return (
    <Router>
      <AppRoutes user={ user } setUser={ setUser } />
    </Router>
  );
}


export default App;
