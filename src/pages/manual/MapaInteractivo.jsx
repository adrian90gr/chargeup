import React from 'react';
import Cabecera from '../../components/general/CabeceraComponent';
import Pie from '../../components/general/PieComponent';
import { BreadCrumbsComponent } from '../../components/general/BreadCrumbsComponent';
import MapaInteractivo1  from '../../../public/soporte/mapa-interactivo1.png';
import BuscarEstacion1 from '../../../public/soporte/buscar-estacion1.png';
import BuscarEstacion2 from '../../../public/soporte/buscar-estacion2.png';
import BuscarEstacion3 from '../../../public/soporte/buscar-estacion3.png';
import DetallesEstacion1 from '../../../public/soporte/detalles-estacion1.png';
import DetallesEstacion2 from '../../../public/soporte/detalles-estacion2.jpeg';
import Valoraciones1 from '../../../public/soporte/valoraciones1.jpeg';
import Valoraciones2 from '../../../public/soporte/valoraciones2.jpg';
import Valoraciones3 from '../../../public/soporte/valoraciones3.jpg';
import EditarValoracion1 from '../../../public/soporte/editar-valoracion1.jpeg';
import EditarValoracion2 from '../../../public/soporte/editar-valoracion2.jpg';
import EliminarValoracion1 from '../../../public/soporte/eliminar-valoracion1.jpg';
import EliminarValoracion2 from '../../../public/soporte/eliminar-valoracion2.jpg';










export default function UsoMapaInteractivo() {
    return (
        <>
            <Cabecera />
            <BreadCrumbsComponent />
            <div className="p-4 max-w-4xl mx-auto flex flex-col">
                <h1 className="text-3xl font-semibold mb-6 text-slate-700">Cómo Usar el Mapa Interactivo</h1>
                <p>A continuación te mostramos cómo usar el mapa interactivo para encontrar estaciones de carga y gestionar tus valoraciones.</p>
                
                <h2 className="text-2xl font-semibold mt-4 text-slate-700">Acceso al Mapa Interactivo</h2>
                <p>Sigue estos pasos para acceder al mapa interactivo:</p>
                <ol className="list-decimal list-inside">
                    <li>Desde el menú principal, selecciona la opción "Nuestras Estaciones".
                        <ul className='mb-6 flex items-center justify-center'>
                            <li className='w-[90%]'>
                                <img className='shadow-xl' src={MapaInteractivo1} alt="Acceso al Mapa Interactivo" />
                            </li>
                        </ul>
                    </li>
                </ol>
                
                <h2 className="text-2xl font-semibold mt-4 text-slate-700">Encontrar Estaciones de Carga</h2>
                <p>En el mapa interactivo, puedes encontrar estaciones de carga de las siguientes maneras:</p>
                <ol className="list-decimal list-inside">
                    <li>Usa el buscador en la parte superior del mapa para buscar estaciones por nombre o ubicación.
                        <ul className='mb-6 flex items-center justify-center'>
                            <li className='w-[90%]'>
                                <img className='shadow-xl' src={BuscarEstacion1} alt="Buscador en el Mapa" />
                            </li>
                        </ul>
                    </li>
                    <li>Explora las ubicaciones en el mapa. Las estaciones de carga están marcadas con un ícono específico.
                        <ul className='mb-6 flex items-center justify-center'>
                            <li className='w-[90%]'>
                                <img className='shadow-xl' src={BuscarEstacion2} alt="Mapa Interactivo" />
                            </li>
                        </ul>
                    </li>
                    <li>Utiliza la tabla de estaciones para ver una lista detallada. Al hacer clic en una estación, serás dirigido a su ubicación en el mapa.
                        <ul className='mb-6 flex items-center justify-center'>
                            <li className='w-[90%]'>
                                <img className='shadow-xl' src={BuscarEstacion3} alt="Tabla de Estaciones" />
                            </li>
                        </ul>
                    </li>
                </ol>
                
                <h2 className="text-2xl font-semibold mt-4 text-slate-700">Ver Detalles de una Estación</h2>
                <p>Para ver los detalles de una estación de carga:</p>
                <ol className="list-decimal list-inside">
                    <li>Haz clic en la ubicación de la estación en el mapa. Aparecerá un modal con información básica y un botón para ver más detalles.
                        <ul className='mb-6 flex items-center justify-center'>
                            <li className='w-[90%]'>
                                <img className='shadow-xl' src={DetallesEstacion1} alt="Modal de Estación" />
                            </li>
                        </ul>
                    </li>
                    <li>Haz clic en el botón "Ver Detalles" en el modal para ir a la página de detalles de la estación.
                        <ul className='mb-6 flex items-center justify-center'>
                            <li className='w-[90%] mb-6'>
                                <img className='shadow-xl' src={DetallesEstacion1} alt="Botón Ver Detalles" />
                            </li>
                        </ul>
                        <ul className='mb-6 flex items-center justify-center'>
                            <li className='w-[90%] mb-6'>
                                <img className='shadow-xl' src={DetallesEstacion2} alt="Botón Ver Detalles" />
                            </li>
                        </ul>
                    </li>
                </ol>
                
                <h2 className="text-2xl font-semibold mt-4 text-slate-700">Gestionar Valoraciones</h2>
                <p>En la página de detalles de la estación, puedes:</p>
                <ol className="list-decimal list-inside">
                    <li>Ver valoraciones y reseñas dejadas por otros usuarios.
                        <ul className='mb-6 flex items-center justify-center'>
                            <li className='w-[90%]'>
                                <img className='shadow-xl' src={Valoraciones1} alt="Ver Valoraciones" />
                            </li>
                        </ul>
                    </li>
                    <li>Dejar tu propia valoración. Para hacerlo:
                        <ol className="list-decimal list-inside ml-4">
                            <li>Haz clic en "Dejar una valoración".
                                <ul className='mb-6 flex items-center justify-center'>
                                    <li className='w-[90%]'>
                                        <img className='shadow-xl' src={Valoraciones2} alt="Dejar Valoración" />
                                    </li>
                                </ul>
                            </li>
                            <li>Selecciona el número de estrellas y escribe tu reseña.</li>
                            <li>Haz clic en "Enviar" para publicar tu valoración.
                                <ul className='mb-6 flex items-center justify-center'>
                                    <li className='w-[90%]'>
                                        <img className='shadow-xl' src={Valoraciones3} alt="Enviar Valoración" />
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </li>
                    <li>Editar tu valoración:
                        <ol className="list-decimal list-inside ml-4">
                            <li>Encuentra tu valoración en la lista de reseñas.</li>
                            <li>Haz clic en "Editar" para modificarla.
                                <ul className='mb-6 flex items-center justify-center'>
                                    <li className='w-[90%]'>
                                        <img className='shadow-xl' src={EditarValoracion1} alt="Editar Valoración" />
                                    </li>
                                </ul>
                                <ul className='mb-6 flex items-center justify-center'>
                                    <li className='w-[90%]'>
                                        <img className='shadow-xl' src={EditarValoracion2} alt="Editar o Borrar Valoración" />
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </li>
                    <li>Elimina tu valoración:
                        <ol className="list-decimal list-inside ml-4">
                            <li>Haz clic en "Eliminar" para poder borrar la valoración.
                                <ul className='mb-6 flex items-center justify-center'>
                                    <li className='w-[90%]'>
                                        <img className='shadow-xl' src={EliminarValoracion1} alt="Eliminar Valoración" />
                                    </li>
                                </ul>
                                <ul className='mb-6 flex items-center justify-center'>
                                    <li className='w-[90%]'>
                                        <img className='shadow-xl' src={EliminarValoracion2} alt="Eliminar Valoración" />
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </li>
                </ol>
            </div>
            <Pie />
        </>
    );
}
