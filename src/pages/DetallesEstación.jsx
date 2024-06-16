import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cabecera from "../components/general/CabeceraComponent";
import Pie from "../components/general/PieComponent";
import Cookies from 'js-cookie';
import CardEstacionComponent from '../components/detallesEstacion/CardEstaciónComponent';
import TablaValoracionesComponent from '../components/detallesEstacion/TablaValoracionesComponent';
import { BreadCrumbsComponent } from "../components/general/BreadCrumbsComponent";

export default function DetallesEstacion() {
  const navigate = useNavigate();

  useEffect(() => {
    const id = Cookies.get('estacionId');
    if (!id) {
      navigate('/mapa'); // Redirigir a la pantalla del mapa si no hay cookie
    }

    return () => {
      Cookies.remove('estacionId'); // Eliminar la cookie cuando se desmonte el componente
    };
  }, [navigate]);

  return (
    <>
      <Cabecera />
      <BreadCrumbsComponent></BreadCrumbsComponent>
      <main className="flex flex-col items-center">
      <CardEstacionComponent />
        <TablaValoracionesComponent />
      </main>
         
     
      <Pie />
    </>
  );
}
