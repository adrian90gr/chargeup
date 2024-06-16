import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import Cabecera from '../components/general/CabeceraComponent';
import { Button } from 'flowbite-react';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', contrasenia: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (event) => {//Cada vez que cambio algo dentro del input se recarga y se puede ver en la pagina
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

  const handleSubmit = async (event) => {//Para enviar los datos del usuario
    event.preventDefault();
    try {
      await AuthService.login(credentials.email, credentials.contrasenia);
      // Utiliza la función de navegación para ir a la página de inicio en caso de login exitoso
      navigate('/home');
     
    } catch (error) {//Si no hay login exitoso te marca error
      console.error('Error al iniciar sesión:', error);
      setError('Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <>
    <Cabecera></Cabecera>
    <div className=' w-full h-screen flex flex-col items-center mt-24'>
    <div className=" flex flex-col lg:w-1/3 w-3/4 itemsc  mx-auto  bg-slate-700 p-8 rounded-xl ">
      <h1 className="text-3xl font-bold text-white mb-4">Iniciar sesión</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}{/*Te marca error en los campos cuando hay algun capmpo incorrecto*/ }
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="text-white block text-sm font-medium">
            Correo electrónico:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="form-input mt-1 block w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contrasenia" className=" block text-white text-sm font-medium">
            Contraseña:
          </label>
          <input
            type="password"
            id="contrasenia"
            name="contrasenia"
            value={credentials.contrasenia}
            onChange={handleChange}
            className="form-input mt-1 block w-full rounded-md"
          />
        </div>
        <div>

          <Button type='submit' size="lg"  className='focus:outline-none bg-cyan-500 hover:bg-cyan-400 p-2'>Iniciar sesión</Button>
         
        </div>
      </form>
      <p className="mt-4 text-white">
        ¿No tienes una cuenta?{' '}
        <Link to="/registro" className="text-blue-500">
          Regístrate aquí
        </Link>
      </p>
    </div>
    </div>
   
    </>
  );
};

export default Login;
