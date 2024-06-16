import React from "react";
import Pie from "../components/general/PieComponent";
import Cabecera from "../components/general/CabeceraComponent";
import { BreadCrumbsComponent } from "../components/general/BreadCrumbsComponent";
import Fotoplacas from "../../public/images/placas.jpg";
import Fotobaterias from "../../public/images/baterias.webp";
import Fotoemisiones from "../../public/images/reduccion_emisiones.png";
import Fotorecursos from "../../public/images/recursos_narurales2.jpg";


export default function Sostenibilidad() {
  return (
    <>
      <Cabecera />
      <BreadCrumbsComponent />
      <div className="w-full min-h-screen flex flex-col items-center">
        <main className="flex flex-col items-center px-4 py-8 max-w-4xl w-full">
          <section className="my-8 text-center" aria-labelledby="enfoque">
            <h2 id="enfoque" className="text-3xl text-slate-700">Nuestro Enfoque</h2>
            <p className="mt-4">
              En ChargeUp, nos enfocamos en proporcionar soluciones innovadoras
              para la carga de vehículos eléctricos, promoviendo un uso
              eficiente y sostenible de la energía. Nuestra visión es un mundo
              donde la energía renovable sea la norma, y cada vehículo en la
              carretera contribuya a un medio ambiente más limpio.
            </p>
          </section>
          <section className="my-8 text-center" aria-labelledby="energia-renovable">
            <h2 id="energia-renovable" className="text-3xl text-slate-700">Energía Renovable</h2>
            <p className="mt-4">
              Utilizamos exclusivamente paneles solares para alimentar nuestras
              estaciones de carga, asegurando que cada carga que proporcionamos
              es limpia y verde.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="bg-slate-700 shadow-md rounded-lg overflow-hidden">
                <img
                  src={Fotoplacas}
                  alt="Paneles solares de alta eficiencia capturando energía solar"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl text-white">Paneles Solares de Alta Eficiencia</h3>
                  <p className="text-white mt-2 text-start">
                    Nuestros paneles solares están diseñados para capturar la
                    máxima cantidad de energía solar posible.
                  </p>
                </div>
              </div>
              <div className="bg-slate-700 shadow-md rounded-lg overflow-hidden">
                <img
                  src={Fotobaterias}
                  alt="Sistemas de almacenamiento de energía para suministro constante"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl text-white">Sistemas de Almacenamiento de Energía</h3>
                  <p className="text-white mt-2 text-start">
                    Almacenamos la energía generada durante el día para asegurar
                    un suministro constante, incluso durante la noche.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="my-8" aria-labelledby="impacto-ambiental">
            <h2 id="impacto-ambiental" className="text-3xl font-semibold text-slate-700 text-center">
              Impacto Ambiental
            </h2>
            <p className="mt-4 text-center">
              Nuestras iniciativas están orientadas a reducir la huella de
              carbono y fomentar la adopción de tecnologías ecológicas,
              contribuyendo a un planeta más saludable.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="bg-slate-700 shadow-md rounded-lg overflow-hidden">
                <img
                  src={Fotoemisiones}
                  alt="Esquema de reducción de emisiones de CO2"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl text-center text-white">Reducción de Emisiones</h3>
                  <p className="text-white mt-2">
                    Gracias a nuestras estaciones de carga, ayudamos a reducir
                    las emisiones de CO2, promoviendo un transporte más limpio.
                  </p>
                </div>
              </div>
              <div className="bg-slate-700 shadow-md rounded-lg overflow-hidden">
                <img
                  src={Fotorecursos}
                  alt="Conservación de recursos naturales mediante eficiencia"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl text-center text-white">Conservación de Recursos</h3>
                  <p className="text-white mt-2">
                    Nuestros sistemas están diseñados para ser eficientes y
                    conservar recursos naturales al máximo.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Pie />
    </>
  );
}
