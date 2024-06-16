import axios from "axios";
import Cookies from 'js-cookie';

const ESTACION_BASE_REST_API_URL = "https://back-b1i4.onrender.com/api/estaciones/";

class EstacionService {
    getAllEstaciones() {//Lista de estaciones
        const token = Cookies.get('access_token');
        return axios.get(ESTACION_BASE_REST_API_URL, {
            headers: { 'Authorization': `Bearer ${token}` },
            withCredentials: true
        });
    }

    getEstacionById(id) {//Obtener estacion por su id
        const token = Cookies.get('access_token');
        return axios.get(`${ESTACION_BASE_REST_API_URL}${id}/`, {
            headers: { 'Authorization': `Bearer ${token}` },
            withCredentials: true
        });
    }

    crearEstacion(estacion) {//Crear una estacion
        const token = Cookies.get('access_token');
        return axios.post(ESTACION_BASE_REST_API_URL+"registrar/", estacion, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        });
    }

    actualizarEstacion(id, estacion) {//Actualizar estacion
        const token = Cookies.get('access_token');
        return axios.put(`${ESTACION_BASE_REST_API_URL}${id}/actualizar/`, estacion, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        });
    }
    

    eliminarEstacion(id) {//Borrar estacion
        const token = Cookies.get('access_token');
        return axios.delete(`${ESTACION_BASE_REST_API_URL}${id}/eliminar/`, {
            headers: { 'Authorization': `Bearer ${token}` },
            withCredentials: true
        });
    }
}

export default new EstacionService();
