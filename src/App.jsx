import { Navigate, Route, Routes } from "react-router-dom";
import Registro from "./pages/Registro";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoutes";
import AuthRoute from "./routes/AuthRoutes";
import "./App.css";
import Sostenibilidad from "./pages/Sostenibilidad";
import DetallesEstacion from "./pages/DetallesEstación";
import { Mapa } from "./pages/Mapa";
import PanelAdministrador from "./pages/PanelAdministrador";
import { PerfilUsuario } from "./pages/PerfilUsuario";
import { Contacta } from "./pages/Contacta";
import SobreNosotros from "./pages/SobreNosotros";
import NuestroCompromiso from "./pages/NuestroCompromiso";
import Ayuda from "./pages/Ayuda";
import ComoEmpezar from "./pages/manual/ComoEmpezar";
import MapaInteractivo from "./pages/manual/MapaInteractivo";
import Cuenta from "./pages/manual/Cuenta";
import InformacionGeneral from "./pages/manual/InfoGeneral";
import axios from 'axios';
import Cookies from 'js-cookie';
import AuthService from './services/AuthService';

// Configurar interceptores de Axios
axios.interceptors.request.use(
    (config) => {
        const token = Cookies.get('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const newAccessToken = await AuthService.refreshToken();

            if (newAccessToken) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);




function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/sostenibilidad" element={<Sostenibilidad />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/mapa/detallesestacion" element={<DetallesEstacion />} />
          <Route path="/paneladministrador" element={<PanelAdministrador />} />
          <Route path="/perfilusuario" element={<PerfilUsuario />} />
          <Route path="/contacta" element={<Contacta />} />
          <Route path="/sobrenosotros" element={<SobreNosotros />} />
          <Route path="/nuestrocompromiso" element={<NuestroCompromiso />} />
          <Route path="/ayuda" element={<Ayuda />} />
          <Route path="/ayuda/como-empezar" element={<ComoEmpezar />} />
          <Route path="/ayuda/mapa-interactivo" element={<MapaInteractivo />} />
          <Route path="/ayuda/cuenta" element={<Cuenta />} />
          <Route
            path="/ayuda/informacion-general"
            element={<InformacionGeneral />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
