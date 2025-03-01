import React from 'react';

const UsuarioItem = ( { usuario, onDelete, onEdit } ) => {
  return (
    <div>
      <p>{ usuario.nombre } { usuario.apellido_paterno } - { usuario.email }</p>
      <button
        style={ { marginRight: '10px', backgroundColor: 'yellow', color: 'black', border: 'none', padding: '5px 10px' } }
        onClick={ () => onEdit( usuario ) }>
        Editar
      </button>

      <button
        style={ { backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px' } }
        onClick={ () => onDelete( usuario._id ) }>Eliminar</button>
    </div>
  );
};

export default UsuarioItem;
