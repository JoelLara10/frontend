import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsuarioForm from './UsuarioForm';
import { Bar } from 'react-chartjs-2';
import './Usuarios.css';

const UsuarioList = () => {
  const [ usuarios, setUsuarios ] = useState( [] );
  const [ searchTerm, setSearchTerm ] = useState( '' );
  const [ editingUser, setEditingUser ] = useState( null );
  const [ isAdding, setIsAdding ] = useState( false );

  // Paginación
  const [ currentPage, setCurrentPage ] = useState( 1 );
  const usersPerPage = 10;

  useEffect( () => {
    obtenerUsuarios();
  }, [] );

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get( 'http://localhost:5000/api/usuarios' );
      setUsuarios( response.data );
    } catch ( error ) {
      console.error( 'Error al obtener usuarios:', error );
    }
  };

  const filteredUsers = usuarios.filter( usuario =>
    Object.values( usuario ).some( value =>
      value && value.toString().toLowerCase().includes( searchTerm.toLowerCase() )
    )
  );

  // Cálculo de paginación
  const totalPages = Math.ceil( filteredUsers.length / usersPerPage );
  const startIndex = ( currentPage - 1 ) * usersPerPage;
  const paginatedUsers = filteredUsers.slice( startIndex, startIndex + usersPerPage );

  const handleDelete = async ( id ) => {
    if ( window.confirm( "¿Seguro que deseas eliminar este usuario?" ) ) {
      try {
        await axios.delete( `http://localhost:5000/api/usuarios/${ id }` );
        setUsuarios( usuarios.filter( u => u._id !== id ) );
      } catch ( error ) {
        console.error( 'Error al eliminar usuario:', error );
      }
    }
  };

  const handleEdit = ( usuario ) => {
    setEditingUser( usuario );
    setIsAdding( false );
  };

  const handleAdd = () => {
    setEditingUser( null );
    setIsAdding( true );
  };

  const handleSave = () => {
    obtenerUsuarios();
    setEditingUser( null );
    setIsAdding( false );
  };

  const handleCancel = () => {
    setEditingUser( null );
    setIsAdding( false );
  };

  const handleImport = async ( event ) => {
    const file = event.target.files[ 0 ];
    if ( !file ) return;

    const formData = new FormData();
    formData.append( 'file', file );

    try {
      await axios.post( 'http://localhost:5000/api/import-excel', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      } );
      obtenerUsuarios();
      alert( 'Usuarios importados correctamente.' );
    } catch ( error ) {
      console.error( 'Error al importar usuarios:', error );
      alert( 'Error al importar usuarios.' );
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get( 'http://localhost:5000/api/export-excel', {
        responseType: 'blob',
      } );

      const url = window.URL.createObjectURL( new Blob( [ response.data ] ) );
      const link = document.createElement( 'a' );
      link.href = url;
      link.setAttribute( 'download', 'usuarios.xlsx' );
      document.body.appendChild( link );
      link.click();
    } catch ( error ) {
      console.error( 'Error al exportar usuarios:', error );
    }
  };

  // Datos para la gráfica de usuarios por rol
  const roles = usuarios.reduce( ( acc, usuario ) => {
    acc[ usuario.rol ] = ( acc[ usuario.rol ] || 0 ) + 1;
    return acc;
  }, {} );

  const coloresFondo = [
    'rgba(255, 99, 132, 0.6)',  // Rojo
    'rgba(54, 162, 235, 0.6)',  // Azul
    'rgba(255, 206, 86, 0.6)',  // Amarillo
    'rgba(75, 192, 192, 0.6)',  // Verde
    'rgba(153, 102, 255, 0.6)', // Morado
    'rgba(255, 159, 64, 0.6)'   // Naranja
  ];

  const coloresBorde = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ];

  const chartData = {
    labels: Object.keys( roles ),
    datasets: [
      {
        label: 'Cantidad de Usuarios',
        data: Object.values( roles ),
        backgroundColor: Object.keys( roles ).map( ( _, index ) => coloresFondo[ index % coloresFondo.length ] ),
        borderColor: Object.keys( roles ).map( ( _, index ) => coloresBorde[ index % coloresBorde.length ] ),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true, // Hace que la gráfica se ajuste automáticamente
    maintainAspectRatio: false, // Permite cambiar el tamaño manualmente
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>

      <input
        type="text"
        placeholder="Buscar usuario..."
        value={ searchTerm }
        onChange={ ( e ) => setSearchTerm( e.target.value ) }
      />

      <div>
        { !isAdding && !editingUser && (
          <>
            <button className="add-button" onClick={ handleAdd }>Agregar Usuario</button>
            <input type="file" accept=".xlsx" onChange={ handleImport } />
            <button className="export-button" onClick={ handleExport }>Exportar a Excel</button>
          </>
        ) }
      </div>

      { ( isAdding || editingUser ) && (
        <div>
          <UsuarioForm usuario={ editingUser } onSave={ handleSave } />
          <button className="btn btn-cancel" onClick={ handleCancel }>Cancelar</button>
        </div>
      ) }

      { paginatedUsers.length === 0 ? (
        <p>No se encontraron usuarios.</p>
      ) : (
        <>
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Email</th>
                <th>Fecha de Nacimiento</th>
                <th>Rol</th>
                <th>Intentos</th>
                <th>Bloqueo Hasta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              { paginatedUsers.map( usuario => (
                <tr key={ usuario._id }>
                  <td>{ usuario.nombre }</td>
                  <td>{ usuario.apellido_paterno }</td>
                  <td>{ usuario.apellido_materno }</td>
                  <td>{ usuario.email }</td>
                  <td>{ usuario.fechaNacimiento ? new Date( usuario.fechaNacimiento ).toLocaleDateString() : 'N/A' }</td>
                  <td>{ usuario.rol }</td>
                  <td>{ usuario.intentos }</td>
                  <td>{ usuario.bloqueo_hasta ? new Date( usuario.bloqueo_hasta ).toLocaleDateString() : 'N/A' }</td>
                  <td>
                    <button className="add-button" onClick={ () => handleEdit( usuario ) }>Editar</button>
                    <button className="delete-button" style={ { backgroundColor: 'red' } } onClick={ () => handleDelete( usuario._id ) }>Eliminar</button>
                  </td>
                </tr>
              ) ) }
            </tbody>
          </table>

          {/* Controles de paginación */ }
          <div className="pagination">
            <button
              className="btn-prev"
              onClick={ () => setCurrentPage( prev => Math.max( prev - 1, 1 ) ) }
              disabled={ currentPage === 1 }
            >
              Anterior
            </button>
            <span>Página { currentPage } de { totalPages }</span>
            <button
              className="btn-next"
              onClick={ () => setCurrentPage( prev => Math.min( prev + 1, totalPages ) ) }
              disabled={ currentPage === totalPages }
            >
              Siguiente
            </button>
          </div>
          <h3>Usuarios por Rol</h3>
          <div style={ { width: '700px', height: '400px' } }>
            <Bar data={ chartData } options={ chartOptions } />
          </div>
        </>
      ) }
    </div>
  );
};

export default UsuarioList;
