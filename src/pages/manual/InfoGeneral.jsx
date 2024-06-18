import React from 'react';
import Cabecera from '../../components/general/CabeceraComponent';
import Pie from '../../components/general/PieComponent';
import { BreadCrumbsComponent } from '../../components/general/BreadCrumbsComponent';
import Sostenibilidad1 from '../../../public/soporte/sostenibilidad1.jpeg';
import Sostenibilidad2 from '../../../public/soporte/sostenibilidad2.jpeg';
import SobreNosotros1 from '../../../public/soporte/sobre-nosotros1.jpeg';
import SobreNosotros2 from '../../../public/soporte/sobre-nosotros2.jpeg' ;
import Contacta1 from '../../../public/soporte/contacta1.jpeg';
import Contacta2 from '../../../public/soporte/contacta2.jpeg';
import NuestroCompromiso1 from '../../../public/soporte/nuestro-compromiso1.jpeg';
import NuestroCompromiso2 from '../../../public/soporte/nuestro-compromiso2.jpeg';


export default function InformacionGeneral() {
    return (
        <>
            <Cabecera />
            <BreadCrumbsComponent />
            <div className="p-4 max-w-4xl mx-auto flex flex-col">
                <h1 className="text-3xl font-semibold mb-6 text-slate-700">Información General</h1>
                
                <h2 className="text-2xl font-semibold mt-4 text-slate-700">Cómo Acceder a la Información de Sostenibilidad</h2>
                <p>Para encontrar información sobre nuestras prácticas de sostenibilidad, sigue estos pasos:</p>
                <ol className="list-decimal list-inside">
                    <li>Desde el menú principal, selecciona "Sostenibilidad".
                        <ul className='mb-6 flex items-center justify-center'>
                            <li className='w-[90%]'>
                                <img className='shadow-xl' src={Sostenibilidad1} alt="Acceso a Sostenibilidad"></img>
                            </li>
                        </ul>
                    </li>
                    <li>Aquí encontrarás detalles sobre nuestro uso de energía renovable y el impacto ambiental.
                        <ul className='mb-6 flex items-center justify-center'>
                            <li className='w-[90%]'>
                            <img className='shadow-xl' src={Sostenibilidad2} alt="Acceso a Sostenibilidad"></img>
                            </li>
                        </ul>
                    </li>
                </ol>

                <h2 className="text-2xl font-semibold mt-4 text-slate-700">Cómo Saber Sobre Nosotros</h2>
                <p>Para obtener información sobre nuestra empresa y equipo, sigue estos pasos:</p>
                <ol className="list-decimal list-inside">
                    <li>Desde el menú principal, selecciona "Sobre Nosotros".
                        <ul className='mb-6 flex items-center justify-center'>
                            <li className='w-[90%]'>
                                <img className='shadow-xl' src={SobreNosotros1} alt="Acceso a Sobre Nosotros"></img>
                            </li>
                        </ul>
                    </li>
                    <li>Aquí encontrarás detalles sobre nuestra historia, equipo y valores.
                        <ul className='mb-6 flex items-center justify-center'>
                            <li className='w-[90%]'>
                                <img className='shadow-xl' src={SobreNosotros2}alt="Detalles Sobre Nosotros"></img>
                            </li>
                        </ul>
                    </li>
                </ol>

                <h2 className="text-2xl font-semibold mt-4 text-slate-700">Cómo Contactar con Nosotros</h2>
                <p>Para ponerte en contacto con nosotros, sigue estos pasos:</p>
                <ol className="list-decimal list-inside">
                    <li>Desde el menú principal, selecciona "Soporte Técnico" o "Contacta con Nosotros".
                        <ul className='mb-6 flex items-center justify-center'>
                            <li className='w-[90%]'>
                                <img className='shadow-xl' src={Contacta1} alt="Acceso a Contacto"></img>
                            </li>
                        </ul>
                    </li>
                    <li>Completa el formulario de contacto con tu nombre, correo electrónico y mensaje, y haz clic en "Enviar".
                        <ul className='mb-6 flex items-center justify-center'>
                            <li className='w-[90%]'>
                            <img className='shadow-xl' src={Contacta2} alt="Acceso a Contacto"></img>
                            </li>
                        </ul>
                    </li>
                    <li>También puedes contactarnos directamente a través de:
                        <ul className="list-disc list-inside ml-4">
                            <li>Teléfono: +34 669 887 441</li>
                            <li>Correo Electrónico: <a href="mailto:chargeup20242025@gmail.com" className="text-blue-500">chargeup20242025@gmail.com</a> (al hacer clic se abrirá tu aplicación de correo)</li>
                            <li>Comunidad WhatsApp: <a href="https://chat.whatsapp.com/DFsjnnBqnJBH2kpDT6pudy" className="text-blue-500">Comunidad WhatsApp</a> (haz clic para unirte directamente)</li>
                        </ul>
                    </li>
                </ol>

                <h2 className="text-2xl font-semibold mt-4 text-slate-700">Cómo Acceder a "Nuestro Compromiso"</h2>
                <p>Para conocer más sobre nuestro compromiso con la sostenibilidad y responsabilidad social, sigue estos pasos:</p>
                <ol className="list-decimal list-inside">
                    <li>Desde el menú principal, selecciona "Nuestro Compromiso".
                        <ul className='mb-6 flex items-center justify-center'>
                            <li className='w-[90%]'>
                            <img className='shadow-xl' src={NuestroCompromiso1} alt="Acceso a Contacto"></img>
                            </li>
                        </ul>
                    </li>
                    <li>Aquí encontrarás detalles sobre nuestras políticas de organización saludable y nuestras iniciativas sostenibles y podras decargar el documento de politica de organizacion saludable haciendo clic en el.
                        <ul className='mb-6 flex items-center justify-center'>
                            <li className='w-[90%]'>
                            <img className='shadow-xl' src={NuestroCompromiso2} alt="Acceso a Contacto"></img>
                            </li>
                        </ul>
                    </li>
                
                </ol>
            </div>
            <Pie />
        </>
    );
}
