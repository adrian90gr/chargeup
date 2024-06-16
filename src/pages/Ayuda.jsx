import React from 'react';
import { Link } from 'react-router-dom';
import Pie from '../components/general/PieComponent';
import Cabecera from '../components/general/CabeceraComponent';
import { BreadCrumbsComponent } from '../components/general/BreadCrumbsComponent';

const categories = [
    { id: 1, name: 'Cómo empezar', description: 'Información para nuevos usuarios', link: '/ayuda/como-empezar' },
    { id: 2, name: 'Mapa interactivo', description: 'Aqui te ayudamos a buscar las estaciones disponibles', link: '/ayuda/mapa-interactivo' },
    { id: 3, name: 'Cuenta', description: 'Gestión de tu cuenta y perfil', link: '/ayuda/cuenta' },
    { id: 4, name: 'Informacion general', description: 'Sitio de contacto, sostenibilidad y conocer a nuestro equipo', link: '/ayuda/informacion-general' }
];

const faqs = [
    { question: '¿Cómo inicio sesión en la aplicación?', answer: 'Para iniciar sesión, haz clic en el botón de inicio de sesión y sigue las instrucciones.' },
    { question: '¿Cómo recargo mi coche eléctrico?', answer: 'Visita una de nuestras estaciones y sigue las instrucciones en la pantalla para comenzar la recarga.' },
    { question: '¿Dónde puedo ver mi historial de recargas?', answer: 'Puedes ver tu historial de recargas en la sección "Mi cuenta" de la aplicación.' },
    { question: '¿Qué hago si tengo problemas técnicos?', answer: 'Contacta con nuestro soporte técnico a través del formulario de contacto en la aplicación.' }
];

export default function Ayuda() {
    return (
        <>
            <Cabecera />
            <BreadCrumbsComponent />
            <main className="p-4 max-w-4xl mx-auto">
                <div className="mb-10">
                    <h2 className="text-3xl text-slate-700 font-semibold mb-6">Manual de usuario online</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {categories.map(category => (
                            <Link to={category.link} key={category.id} className="no-underline">
                                <div className="h-[150px] p-6 bg-slate-700 border border-gray-300 rounded-lg shadow hover:shadow-xl transition-shadow duration-300">
                                    <h3 className="text-2xl text-white font-medium mb-2">{category.name}</h3>
                                    <p className="text-white">{category.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="mb-10">
                    <h2 className="text-3xl font-semibold text-slate-700 mb-6">Ayuda y Preguntas Frecuentes</h2>
                    <div className="flex flex-col gap-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="p-6 border bg-slate-700 border-gray-300 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                                <h3 className="text-xl text-white font-medium mb-2">{faq.question}</h3>
                                <p className="text-white">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Pie />
        </>
    );
}
