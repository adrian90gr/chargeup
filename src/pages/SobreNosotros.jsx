import React from "react";
import Pie from "../components/general/PieComponent";
import Cabecera from "../components/general/CabeceraComponent";
import { BreadCrumbsComponent } from "../components/general/BreadCrumbsComponent";

export default function SobreNosotros() {
  return (
    <>
      <Cabecera />
      <BreadCrumbsComponent />
      <main className="flex flex-col items-center px-4 py-8 w-full">
        <section className="my-8 text-center" aria-labelledby="nuestra-empresa">
          <h2 id="nuestra-empresa" className="text-3xl font-semibold text-slate-700">
            Nuestra Empresa
          </h2>
          <p className="mt-4 max-w-2xl mx-auto">
            En ChargeUp, estamos comprometidos con la innovación y la
            sostenibilidad. Fundada en 2024, nuestra misión es facilitar la
            transición hacia un futuro más verde mediante soluciones de carga
            eléctrica eficientes y accesibles.
          </p>
        </section>

        <section className="my-8 text-center" aria-labelledby="nuestro-equipo">
          <h2 id="nuestro-equipo" className="text-3xl font-semibold text-slate-700">
            Nuestro Equipo
          </h2>
          <p className="mt-4 max-w-2xl mx-auto">
            Nuestro equipo está formado por profesionales apasionados y
            dedicados, con experiencia en tecnología, ingeniería y
            sostenibilidad. Trabajamos juntos para crear productos innovadores
            que hagan la diferencia.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8">
            <div className="bg-slate-700 shadow-md rounded-lg overflow-hidden flex-1 max-w-xs">
              <img
                src="../../public/images/ejecutivo2.webp"
                alt="Juan Pérez, CEO & Fundador"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">Juan Pérez</h3>
                <p className="text-white mt-2">CEO & Fundador</p>
              </div>
            </div>
            <div className="bg-slate-700 shadow-md rounded-lg overflow-hidden flex-1 max-w-xs">
              <img
                src="../../public/images/ejecutiva1.webp"
                alt="Ana Gómez, CTO"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">Ana Gómez</h3>
                <p className="text-white mt-2">CTO</p>
              </div>
            </div>
            <div className="bg-slate-700 shadow-md rounded-lg overflow-hidden flex-1 max-w-xs">
              <img
                src="../../public/images/ejecutivo1.webp"
                alt="Carlos Rodríguez, Director de Marketing"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">
                  Carlos Rodríguez
                </h3>
                <p className="text-white mt-2">Director de Marketing</p>
              </div>
            </div>
          </div>
        </section>

        <section className="my-8 text-center" aria-labelledby="nuestros-valores">
          <h2 id="nuestros-valores" className="text-3xl font-semibold text-slate-700">
            Nuestros Valores
          </h2>
          <p className="mt-4 max-w-2xl mx-auto">
            En ChargeUp, nuestros valores fundamentales son la sostenibilidad,
            la innovación y la excelencia. Nos esforzamos por ofrecer productos
            y servicios que no solo satisfacen las necesidades de nuestros
            clientes, sino que también contribuyen a un futuro más sostenible.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
            <div className="bg-slate-700 shadow-md rounded-lg p-6 max-w-xs w-full md:w-1/3">
              <h3 className="text-white text-2xl font-semibold">
                Sostenibilidad
              </h3>
              <p className="text-white mt-2">
                Nuestro compromiso con el medio ambiente guía todas nuestras
                decisiones y acciones.
              </p>
            </div>
            <div className="bg-slate-700 shadow-md rounded-lg p-6 max-w-xs w-full md:w-1/3">
              <h3 className="text-white text-2xl font-semibold">Innovación</h3>
              <p className="text-white mt-2">
                Buscamos constantemente nuevas formas de mejorar y revolucionar
                la industria de la carga eléctrica.
              </p>
            </div>
            <div className="bg-slate-700 shadow-md rounded-lg p-6 max-w-xs w-full md:w-1/3">
              <h3 className="text-white text-2xl font-semibold">Excelencia</h3>
              <p className="text-white mt-2">
                Con esfuerzo y dedicación, nos dedicamos a ofrecer la máxima calidad en todo lo que
                hacemos.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Pie />
    </>
  );
}
  