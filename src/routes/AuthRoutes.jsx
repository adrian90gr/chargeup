import { Navigate, useNavigate,Outlet} from 'react-router-dom';
import AuthService from '../services/AuthService';

const AuthRoute = ({children}) => {
    const isAuthenticated = AuthService.isAuthenticated();//Comprobamos si estamos autenticados

    if (isAuthenticated) {//Para evitar volver al login nos redirige a home si estamos autenticados.
        return <Navigate to="/home" />;
    }

    return children, <Outlet />;//Renderizamos la pagina
};

export default AuthRoute;



   