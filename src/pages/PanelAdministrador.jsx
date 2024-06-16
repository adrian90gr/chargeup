import React, { useState } from 'react';
import Sidebar from '../components/panelAdministrador/SidebarComponent';
import TablaUsuarios from '../components/panelAdministrador/TablaUsuariosComponent';
import TablaEstaciones from '../components/panelAdministrador/TablaEstacionesComponent';
import TablaVehiculos from '../components/panelAdministrador/TablaVehiculosComponent';
import TablaValoraciones from '../components/panelAdministrador/TablaValoracionesComponent'
import Pie from '../components/general/PieComponent';



export default function PanelAdministrador() {
    const [activeTab, setActiveTab] = useState('usuarios');

    return (
        <> 
            <main className='contenedor-main flex flex-col justify-between h-screen'>
                <Sidebar className='h-screen overflow-hidden z-0' setActiveTab={setActiveTab}>
                    {activeTab === 'usuarios' && <TablaUsuarios />}
                    {activeTab === 'estaciones' && <TablaEstaciones />}
                    {activeTab === 'vehiculos' && <TablaVehiculos />}
                    {activeTab === 'valoraciones' && <TablaValoraciones />}
                </Sidebar > 
                <Pie />
            </main>
        </>
    );
}
