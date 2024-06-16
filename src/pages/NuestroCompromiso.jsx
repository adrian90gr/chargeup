import React from "react";
import Pie from "../components/general/PieComponent";
import Cabecera from "../components/general/CabeceraComponent";
import { BreadCrumbsComponent } from "../components/general/BreadCrumbsComponent";
import Fotoestacioncarga from "../../public/images/estacion_carga_fotovoltaica.jpg";
import Fotocochelimpio from "../../public//images/coche_limpio.jpg";

export default function NuestroCompromiso() {
  return (
    <>
      <Cabecera />
      <BreadCrumbsComponent />
      <div className="w-full min-h-screen flex flex-col items-center">
        <main className="flex flex-col items-center px-4 py-8 max-w-4xl w-full">
          <section className="my-8 text-center">
            <h2 className="text-3xl text-slate-700">Nuestro Compromiso</h2>
            <p className="mt-4 max-w-2xl mx-auto">
              En ChargeUp, nos comprometemos a liderar con el ejemplo en
              sostenibilidad y responsabilidad social. Nuestra misión es no solo
              ofrecer soluciones de carga eléctrica eficientes, sino también
              inspirar un cambio positivo en la industria y la comunidad.
            </p>
          </section>
          <section className="my-8 text-center">
            <h2 className="text-3xl text-slate-700">
              Política de Organización Saludable
            </h2>
            <p className="mt-4 max-w-2xl mx-auto">
              Promovemos un entorno de trabajo saludable y seguro para todos
              nuestros empleados. Implementamos prácticas que fomentan el
              bienestar físico y mental, asegurando que nuestro equipo pueda
              prosperar en todos los aspectos de su vida.
            </p>
            <div className="mt-8">
              <a
                href="/documents/politica_de_organizacion_saludable_de_ChargeUp.pdf"
                className="bg-cyan-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
                download
              >
                Descargar este documento
              </a>
            </div>
          </section>
          <section className="my-8 ">
            <h2 className="text-3xl text-slate-700 text-center">
              Iniciativas Sostenibles
            </h2>
            <p className="mt-4 text-center max-w-2xl mx-auto">
              Nuestras iniciativas sostenibles están diseñadas para reducir
              nuestro impacto ambiental y promover prácticas ecológicas. Desde
              el uso de energía renovable hasta la reducción de residuos, cada
              acción cuenta para un futuro más verde.
            </p>
            <div className="flex flex-col items-center justify-center md:flex-row gap-6 mt-8">
              <div className="bg-slate-700 shadow-md rounded-lg overflow-hidden flex-1 max-w-xs">
                <img
                  src={Fotoestacioncarga}
                  alt="Iniciativa 1"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl text-white">Energía Renovable</h3>
                  <p className="text-white mt-2 text-start">
                    Todas nuestras estaciones de carga están alimentadas por
                    energía solar, asegurando una carga limpia y sostenible.
                  </p>
                </div>
              </div>
              <div className="bg-slate-700 shadow-md rounded-lg overflow-hidden flex-1 max-w-xs">
                <img
                  src={Fotocochelimpio}
                  alt="Iniciativa 2"
                  className="w-full h-48 "
                />
                <div className="p-4">
                  <h3 className="text-xl text-white">Reducción de Residuos</h3>
                  <p className="text-white mt-2 text-start">
                    Implementamos prácticas de reducción de residuos en todas
                    nuestras operaciones, promoviendo un ciclo de vida de
                    producto más sostenible.
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
