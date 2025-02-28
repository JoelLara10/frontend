const API_URL = 'http://localhost:5000/api/usuarios';

export const getUsuarios = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const createUsuario = async (usuario) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
    });
    return response.json();
};
