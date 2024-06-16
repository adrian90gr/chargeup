import { Navigate, useNavigate,Outlet} from 'react-router-dom';
import AuthService from '../services/AuthService';

const ProtectedRoute = ({children}) => {
    let isAuthenticated=AuthService.isAuthenticated();

    if (!isAuthenticated) {//Si no estamos autenticados
        return <Navigate to="/" />;//Nos redirige a login
    }
   
    return  children , <Outlet/>;//Renderizado de la pagina
    
}


    export default ProtectedRoute;
