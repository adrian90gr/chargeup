import axios from "axios";
import Cookies from 'js-cookie';

const VEHICULO_BASE_REST_API_URL = "https://back-b1i4.onrender.com/api/vehiculos/";

class VehiculoService {
    
    getAllVehiculos() {//Lista de vehiculos
        const token = Cookies.get('access_token');
        return axios.get(VEHICULO_BASE_REST_API_URL, {
            headers: { 'Authorization': `Bearer ${token}` },
            withCredentials: true
        });
    }

    getVehiculoById(id) {//Vehiculo por id
        const token = Cookies.get('access_token');
        return axios.get(`${VEHICULO_BASE_REST_API_URL}${id}/`, {
            headers: { 'Authorization': `Bearer ${token}` },
            withCredentials: true
        });
    }

    getVehiculosByUsuario(usuarioId) {//Vehiculo por usuario
        const token = Cookies.get('access_token');
        return axios.get(`${VEHICULO_BASE_REST_API_URL}usuario/${usuarioId}/`, {
            headers: { 'Authorization': `Bearer ${token}` },
            withCredentials: true
        });
    }

    crearVehiculo(vehiculo) {//Crear vehiculo
        const token = Cookies.get('access_token');
        return axios.post(VEHICULO_BASE_REST_API_URL, vehiculo, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        });
    }

    actualizarVehiculo(id, vehiculo) {//Actualizar vehiculo
        const token = Cookies.get('access_token');
        return axios.put(`${VEHICULO_BASE_REST_API_URL}${id}/`, vehiculo, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        });
    }

    eliminarVehiculo(id) {//Eliminar vehiculo
        const token = Cookies.get('access_token');
        return axios.delete(`${VEHICULO_BASE_REST_API_URL}${id}/`, {
            headers: { 'Authorization': `Bearer ${token}` },
            withCredentials: true
        });
    }
}

export default new VehiculoService();
