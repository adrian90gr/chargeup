import axios from 'axios';
import Cookies from 'js-cookie';

const USUARIO_BASE_REST_API_URL = "https://back-b1i4.onrender.com/api/usuarios/";
const USUARIO_ACTUAL_URL = "https://back-b1i4.onrender.com/api/me/";

class UsuarioService {
    getAllUsuarios() {//Lista de usuarios   
        const token = Cookies.get('access_token');
        return axios.get(USUARIO_BASE_REST_API_URL, {
            headers: { 'Authorization': `Bearer ${token}` },
            withCredentials: true
        });
    }

    getUsuarioById(id) { //Usuario por su id
        const token = Cookies.get('access_token');
        return axios.get(`${USUARIO_BASE_REST_API_URL}${id}/`, {
            headers: { 'Authorization': `Bearer ${token}` },
            withCredentials: true
        });
    }

    getUsuarioActual() {//Usuario actual registrado
        const token = Cookies.get('access_token');
        return axios.get(USUARIO_ACTUAL_URL, {
            headers: { 'Authorization': `Bearer ${token}` },
            withCredentials: true
        });
    }

    deleteUsuario(id) {//Borrar usuario
        const token = Cookies.get('access_token');
        return axios.delete(`${USUARIO_BASE_REST_API_URL}${id}/eliminar/`, {
            headers: { 'Authorization': `Bearer ${token}` },
            withCredentials: true
        });
    }



    updateUsuario(id, userData) {//Actualizar Usuario
        const token = Cookies.get('access_token');
        return axios.put(`${USUARIO_BASE_REST_API_URL}${id}/actualizar/`, userData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });


        
    }


    
}

export default new UsuarioService();
