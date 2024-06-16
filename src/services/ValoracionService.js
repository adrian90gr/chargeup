import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://back-b1i4.onrender.com/api/valoraciones/';

class ValoracionService {
  getValoraciones() {//Lista de valoraciones
    const token = Cookies.get('access_token');
    return axios.get(API_URL, {
      headers: { 'Authorization': `Bearer ${token}` },
      withCredentials: true
    });
  }

  getValoracionById(id) {//Valoraciones por id
    const token = Cookies.get('access_token');
    return axios.get(`${API_URL}${id}/`, {
      headers: { 'Authorization': `Bearer ${token}` },
      withCredentials: true
    });
  }

  getValoracionesByUsuario(usuarioId) {//Validaciones de un usuario
    const token = Cookies.get('access_token');
    return axios.get(`${API_URL}usuario/${usuarioId}/`, {
      headers: { 'Authorization': `Bearer ${token}` },
      withCredentials: true
    });
  }

  getValoracionesByEstacion(estacionId) {//Valoraciones de una estacion
    const token = Cookies.get('access_token');
    return axios.get(`${API_URL}estacion/${estacionId}/`, {
      headers: { 'Authorization': `Bearer ${token}` },
      withCredentials: true
    });
  }

  createValoracion(data) {//Crear Valoracion
    const token = Cookies.get('access_token');
    return axios.post(`${API_URL}registrar/`, data, {
      headers: { 'Authorization': `Bearer ${token}` },
      withCredentials: true
    });
  }

  actualizarValoracion(id, data) {//Actualizar valoracion
    const token = Cookies.get('access_token');
    return axios.put(`${API_URL}${id}/actualizar/`, data, {
      headers: { 'Authorization': `Bearer ${token}` },
      withCredentials: true
    });
  }

  deleteValoracion(id) {//Borrar vloracion
    const token = Cookies.get('access_token');
    return axios.delete(`${API_URL}${id}/eliminar/`, {
      headers: { 'Authorization': `Bearer ${token}` },
      withCredentials: true
    });
  }
}

export default new ValoracionService();
