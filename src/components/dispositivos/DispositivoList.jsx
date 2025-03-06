import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import DispositivoItem from './DispositivoItem';
import DispositivoForm from './DispositivoForm';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';


const DispositivoList = () => {
  const [ dispositivos, setDispositivos ] = useState( [] );
  const [ editingDispositivo, setEditingDispositivo ] = useState( null );
  const [ isAdding, setIsAdding ] = useState( false );
  const [ searchTerm, setSearchTerm ] = useState( '' );
  const [ currentPage, setCurrentPage ] = useState( 1 );
  const itemsPerPage = 5;

  useEffect( () => {
    obtenerDispositivos();
  }, [] );

  const obtenerDispositivos = async () => {
    try {
      const response = await axios.get( 'http://localhost:5000/api/dispositivos' );
      setDispositivos( response.data );
    } catch ( error ) {
      console.error( 'Error al obtener dispositivos:', error.response?.data || error );
    }
  };

  const handleDelete = async ( id ) => {
    if ( window.confirm( "¿Seguro que deseas eliminar este dispositivo?" ) ) {
      try {
        await axios.delete( `http://localhost:5000/api/dispositivos/${ id }` );
        setDispositivos( dispositivos.filter( d => d._id !== id ) );
      } catch ( error ) {
        console.error( 'Error al eliminar dispositivo:', error.response?.data || error );
      }
    }
  };

  const handleEdit = ( dispositivo ) => {
    setEditingDispositivo( dispositivo );
    setIsAdding( false );
  };

  const handleAdd = () => {
    setEditingDispositivo( null );
    setIsAdding( true );
  };

  const handleSave = () => {
    obtenerDispositivos();
    setEditingDispositivo( null );
    setIsAdding( false );
  };

  const handleCancel = () => {
    setEditingDispositivo( null );
    setIsAdding( false );
  };

  const handleImport = async ( event ) => {
    const file = event.target.files[ 0 ];
    if ( !file ) return;

    const formData = new FormData();
    formData.append( 'file', file );

    try {
      await axios.post( 'http://localhost:5000/api/dispositivos/import-excel', formData );
      obtenerDispositivos();
      alert( 'Dispositivos importados correctamente.' );
    } catch ( error ) {
      console.error( 'Error al importar dispositivos:', error );
      alert( 'Error al importar los dispositivos.' );
    }
  };

  const handleExport = async () => {
    window.location.href = 'http://localhost:5000/api/dispositivos/export-excel';
  };

  const filteredDispositivos = dispositivos.filter( dispositivo =>
    Object.values( dispositivo ).some( value =>
      value && value.toString().toLowerCase().includes( searchTerm.toLowerCase() )
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDispositivos = filteredDispositivos.slice( indexOfFirstItem, indexOfLastItem );
  const totalPages = Math.ceil( filteredDispositivos.length / itemsPerPage );

  const dataChart = [
    { name: 'Activos', value: dispositivos.filter( d => d.estado === 'activo' ).length },
    { name: 'Inactivos', value: dispositivos.filter( d => d.estado === 'inactivo' ).length }
  ];

  const COLORS = [ '#0088FE', '#FF8042' ];

  return (
    <div style={ { backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://source.unsplash.com/1600x900/?technology,sound")', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', width: '100vw', overflowX: 'hidden', display: 'flex', flexDirection: 'column' } }>

      {/* Navbar Superior */ }
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
        <Navbar.Brand className="fs-3 fw-bold text-primary">SoundAlertIA</Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center">
          <Link to="/profile">
            <Button variant="outline-light" className="me-2">
              Perfil
            </Button>
          </Link>
          <Link to="/usuarios">
            <Button variant="outline-light" className="me-2">
              Usuarios
            </Button>
          </Link>
          <Link to="/alertas">
            <Button variant="outline-light" className="me-2">
              Alertas
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="danger" className="me-2">
              Cerrar Sesión
            </Button>
          </Link>
        </Nav>
      </Navbar>


      <h2>Lista de Dispositivos</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar usuario..."
          value={ searchTerm }
          onChange={ ( e ) => setSearchTerm( e.target.value ) }
        />
      </div>

      {/* Botones de Acción */ }
      <div className="d-flex justify-content-center align-items-center">
        <button className="btn btn-primary" onClick={ handleAdd }>Agregar Dispositivo</button>
        <input type="file" className="ms-3" onChange={ handleImport } />
        <button className="btn btn-success ms-3" onClick={ handleExport }>Exportar a Excel</button>
      </div>

      {/* Formulario para Agregar/Editar Dispositivo */ }
      { ( isAdding || editingDispositivo ) && (
        <div>
          <DispositivoForm dispositivo={ editingDispositivo } onSave={ handleSave } />
          <button className="btn btn-secondary mt-2" onClick={ handleCancel }>Cancelar</button>
        </div>
      ) }

      {/* Tabla de Dispositivos */ }
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>ID Dispositivo</th>
            <th>ID Usuario</th>
            <th>Ubicación</th>
            <th>Estado</th>
            <th>Último Reporte</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          { currentDispositivos.map( dispositivo => (
            <DispositivoItem key={ dispositivo._id } dispositivo={ dispositivo } onDelete={ handleDelete } onEdit={ handleEdit } />
          ) ) }
        </tbody>
      </table>

      {/* Paginación */ }
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-secondary"
          onClick={ () => setCurrentPage( prev => Math.max( prev - 1, 1 ) ) }
          disabled={ currentPage === 1 }
        >
          Anterior
        </button>
        <span>Página { currentPage } de { totalPages }</span>
        <button
          className="btn btn-secondary"
          onClick={ () => setCurrentPage( prev => Math.min( prev + 1, totalPages ) ) }
          disabled={ currentPage === totalPages }
        >
          Siguiente
        </button>
      </div>

      {/* Gráfico de Pie */ }
      <div className="mt-4">
        <PieChart width={ 400 } height={ 300 }>
          <Pie
            data={ dataChart }
            cx="50%"
            cy="50%"
            outerRadius={ 100 }
            fill="#8884d8"
            dataKey="value"
            label
          >
            { dataChart.map( ( entry, index ) => (
              <Cell key={ `cell-${ index }` } fill={ COLORS[ index % COLORS.length ] } />
            ) ) }
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default DispositivoList;
