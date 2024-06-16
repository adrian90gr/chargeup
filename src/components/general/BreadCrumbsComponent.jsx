import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { useLocation, Link } from 'react-router-dom';

const routeNames = {
    '/mapa': 'Mapa',
    '/mapa/detallesestacion':'Detalles Estación',
    '/perfilusuario':'Perfil de Usuario',
    '/sostenibilidad': 'Sostenibilidad',
    '/sobrenosotros': 'Sobre Nosotros',
    '/nuestrocompromiso': 'Nuestro Compromiso',
    '/contacta': 'Contacta con Nosotros',
    '/paneladministrador':'Panel de Administrador',
    '/ayuda': 'Ayuda',
    '/ayuda/como-empezar':'Como Empezar',
    '/ayuda/mapa-interactivo':'Mapa Interactivo',
    '/ayuda/cuenta':'Cuenta',
    '/ayuda/informacion-general':'Informacion General'
};

export function BreadCrumbsComponent() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <Breadcrumb className="my-1" aria-label="Breadcrumb">
            <Breadcrumb.Item href="/home" icon={HiHome}>
                <p className="text-base">Inicio</p>
            </Breadcrumb.Item>
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                return index + 1 === pathnames.length ? (
                    <Breadcrumb.Item key={to}>
                        <p className="text-base">{routeNames[to]}</p>
                    </Breadcrumb.Item>
                ) : (
                    <Breadcrumb.Item key={to} href={to}>
                        <p className="text-base">{routeNames[to]}</p>
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
}
