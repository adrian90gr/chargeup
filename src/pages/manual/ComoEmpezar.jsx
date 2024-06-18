import React from 'react';
import Cabecera from '../../components/general/CabeceraComponent';
import Pie from '../../components/general/PieComponent';
import { BreadCrumbsComponent } from '../../components/general/BreadCrumbsComponent';
import Registro1 from '../../../public/soporte/registro-1.png';
import Registro2 from '../../../public/soporte/registro-2.png';
import Login from '../../../public/soporte/registro-1.png';
import PaginaPrincipal from '../../../public/soporte/pagina-principal.png';

export default function ComoEmpezar() {
    return (
        <>
        <Cabecera></Cabecera>
        <BreadCrumbsComponent></BreadCrumbsComponent>
        <div className="p-4 max-w-4xl mx-auto flex flex-col">
            <h1 className="text-3xl font-semibold mb-6 text-slate-700">Cómo Empezar</h1>
            <p>A continuación te mostramos cómo empezar a usar nuestra aplicación.</p>
            
            <h2 className="text-2xl font-semibold mt-4 text-slate-700">Registro de Cuenta</h2>
            <p>Sigue estos pasos para registrar tu cuenta:</p>
            <ol className="list-decimal list-inside">
                <li>Abre la aplicación en tu dispositivo.
                    
                </li>
                <li>Haz clic en "Regístrate aquí".
                    <ul className='mb-6 flex items-center justify-center'>
                        <li className='  w-[90%]' >
                            <img className='shadow-xl' src={Registro1}></img>
                        </li>
                    </ul>
                </li>
                <li>Llena el formulario con tu información personal.</li>
                <li>Haz clic en "Enviar" para completar el registro.
                    <ul className='mb-6 flex items-center justify-center'>
                        <li className='  w-[90%]' >
                            <img className='shadow-xl' src={Registro2}></img>
                        </li>
                    </ul>
                </li>
            </ol>
            
            
            <h2 className="text-2xl font-semibold mt-4 text-slate-700">Inicio de Sesión</h2>
            <p>Para iniciar sesión:</p>
            <ol className="list-decimal list-inside">
                
                <li>En la pagina incial, introduce tu email y contraseña.</li>
                <li>Haz clic en "Iniciar sesión".</li>
                <ul className='mb-6 flex items-center justify-center'>
                        <li className='  w-[90%]' >
                            <img className='shadow-xl' src={Login}></img>
                        </li>
                    </ul>
            </ol>
           
            
            <h2 className="text-2xl font-semibold mt-4 text-slate-700">Primeros Pasos</h2>
            <p>Después de iniciar sesión, puedes configurar tu perfil y explorar las funcionalidades principales de la aplicación.</p>

            <img className='w-[90%] shadow-x self-center' src={PaginaPrincipal}></img>
           
        </div>      
        <Pie></Pie>
        </>
        
    );
}
