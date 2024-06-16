import axios from 'axios';
import Cookies from 'js-cookie';

const LOGIN_URL = "https://back-b1i4.onrender.com/api/login/";
const REFRESH_TOKEN_URL = "https://back-b1i4.onrender.com/api/token/refresh/";

class AuthService {
   async login(correo, contraseña) {//Login
        return axios.post(LOGIN_URL, { correo, contraseña })
            .then(response => {
                if (response.data.access) {
                    
                    Cookies.set('access_token', response.data.access);
                    Cookies.set('refresh_token', response.data.refresh);
                    Cookies.set('user_id', response.data.id); 
                }
               
                return response.data;

            });
    }

    logout() {//Cerrar sesion
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        Cookies.remove('user_id');
    }


    isAuthenticated() {//Comprobacion si esta autenticado
        return !!Cookies.get('access_token');
    }



    refreshToken() {//Panra recuperar u nuevo token de acceso
        const refresh_token = Cookies.get('refresh_token');
        if (refresh_token) {
            return axios.post(REFRESH_TOKEN_URL, { refresh: refresh_token })
                .then(response => {
                    if (response.data.access) {
                        Cookies.set('access_token', response.data.access);
                        return response.data.access;
                    }
                });
        }
    }
}

export default new AuthService();
