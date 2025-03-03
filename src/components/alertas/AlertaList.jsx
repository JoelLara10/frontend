import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Alertas.css";

const AlertaList = () => {
  const [ alertas, setAlertas ] = useState( [] );
  const [ searchTerm, setSearchTerm ] = useState( "" );
  const [ currentPage, setCurrentPage ] = useState( 1 );
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect( () => {
    fetchAlertas();
  }, [] );

  const fetchAlertas = async () => {
    try {
      const res = await axios.get( "http://localhost:5000/api/alertas" );
      setAlertas( res.data );
    } catch ( error ) {
      console.error( "Error al obtener alertas:", error );
    }
  };

  const handleEliminar = async ( id ) => {
    if ( window.confirm( "¿Seguro que deseas eliminar esta alerta?" ) ) {
      try {
        await axios.delete( `http://localhost:5000/api/alertas/${ id }` );
        setAlertas( alertas.filter( alerta => alerta._id !== id ) );
      } catch ( error ) {
        console.error( "Error al eliminar la alerta:", error );
      }
    }
  };

  const handleImport = async ( event ) => {
    const file = event.target.files[ 0 ];
    if ( !file ) return;

    const formData = new FormData();
    formData.append( "file", file );

    try {
      await axios.post( "http://localhost:5000/api/alertas/import-excel", formData );
      fetchAlertas();
      alert( 'Alertas importadas correctamente.' );
    } catch ( error ) {
      console.error( "Error al importar alertas:", error );
      alert( 'Error al importar las alertas.' );
    }
  };

  const handleExport = async () => {
    window.open( "http://localhost:5000/api/alertas/export-excel", "_blank" );
  };

  const filteredAlertas = alertas.filter( alerta =>
    Object.values( alerta ).some( value =>
      value && value.toString().toLowerCase().includes( searchTerm.toLowerCase() )
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAlertas.slice( indexOfFirstItem, indexOfLastItem );
  const totalPages = Math.ceil( filteredAlertas.length / itemsPerPage );

  return (
    <div className="alertas-container">
      <h2>Lista de Alertas</h2>
      <input
        type="text"
        placeholder="Buscar alerta..."
        value={ searchTerm }
        onChange={ ( e ) => setSearchTerm( e.target.value ) }
      />
      <div className="controls">
        <button onClick={ () => navigate( "/alertas/nueva" ) }>Agregar Alerta</button>
        <input type="file" accept=".xlsx, .xls" onChange={ handleImport } />
        <button onClick={ handleExport }>Exportar Excel</button>
      </div>
      <table className="alertas-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de Sonido</th>
            <th>Nivel</th>
            <th>Texto</th>
            <th>Ubicación</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          { currentItems.map( ( alerta ) => (
            <tr key={ alerta._id }>
              <td>{ alerta._id || "Sin ID" }</td>
              <td>{ alerta.tipo_sonido || "No definido" }</td>
              <td>{ alerta.nivel_sonido || "No definido" }</td>
              <td>{ alerta.texto_icono || "No definido" }</td>
              <td>{ alerta.ubicacion || "No definido" }</td>
              <td>{ alerta.fecha_hora ? new Date( alerta.fecha_hora ).toLocaleDateString() : "No registrada" }</td>
              <td>{ alerta.notificacion || "Desconocido" }</td>
              <td>
                <button onClick={ () => navigate( `/alertas/editar/${ alerta._id }` ) }>Editar</button>
                <button style={ { backgroundColor: 'red' } } onClick={ () => handleEliminar( alerta._id ) }>Eliminar</button>
              </td>
            </tr>
          ) ) }
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="btn btn-prev"
          onClick={ () => setCurrentPage( prev => Math.max( prev - 1, 1 ) ) }
          disabled={ currentPage === 1 }
        >
          Anterior
        </button>
        <span>Página { currentPage } de { totalPages }</span>
        <button
          className="btn btn-next"
          onClick={ () => setCurrentPage( prev => Math.min( prev + 1, totalPages ) ) }
          disabled={ currentPage === totalPages }
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default AlertaList;
