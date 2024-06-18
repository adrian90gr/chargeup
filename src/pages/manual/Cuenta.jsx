import React from "react";
import Cabecera from "../../components/general/CabeceraComponent";
import Pie from "../../components/general/PieComponent";
import { BreadCrumbsComponent } from "../../components/general/BreadCrumbsComponent";
import Perfil1 from "../../../public/soporte/perfil1.jpg";
import Perfil2 from "../../../public/soporte/perfil2.jpeg";
import Vehiculo1 from "../../../public/soporte/anadir-vehiculo1.jpeg";
import Vehiculo2 from "../../../public/soporte/anadir-vehiculo2.jpg";
import EditarVehiculo1 from "../../../public/soporte/editar-vehiculo1.jpg";
import EditarVehiculo2 from "../../../public/soporte/editar-vehiculo2.jpg";
import EliminarVehiculo1 from "../../../public/soporte/eliminar-vehiculo1.jpg";
import EliminarVehiculo2 from "../../../public/soporte/eliminar-vehiculo2.jpg";
import EditarPerfil1 from "../../../public/soporte/editar-perfil1.jpg";
import EditarPerfil2 from "../../../public/soporte/editar-perfil2.jpg";
import EliminarCuenta1 from "../../../public/soporte/eliminar-cuenta1.jpg";
import EliminarCuenta2 from "../../../public/soporte/eliminar-cuenta2.jpg";




export default function GestionarCuenta() {
  return (
    <>
      <Cabecera />
      <BreadCrumbsComponent />
      <div className="p-4 max-w-4xl mx-auto flex flex-col">
        <h1 className="text-3xl font-semibold mb-6 text-slate-700">
          Gestión de Cuenta
        </h1>
        <p>
          A continuación te mostramos cómo gestionar tu cuenta, incluyendo cómo
          acceder y modificar los detalles de tu perfil y cómo gestionar tus
          vehículos.
        </p>

        <h2 className="text-2xl font-semibold mt-4 text-slate-700">
          Acceder al Perfil
        </h2>
        <p>Sigue estos pasos para acceder a los detalles de tu perfil:</p>
        <ol className="list-decimal list-inside">
          <li>
            Desde el menú principal, haz clic en tu avatar en la esquina
            superior derecha.{" "}
          </li>
          <li>
            En el menú desplegable, selecciona "Mi Perfil".
            <ul className="mb-6 flex items-center justify-center">
              <li className="w-[90%]">
                <img
                  className="shadow-xl"
                  src={Perfil1}
                  alt="Opción Mi Perfil"
                ></img>
              </li>
            </ul>
            <ul className="mb-6 flex items-center justify-center">
              <li className="w-[90%]">
                <img
                  className="shadow-xl"
                  src={Perfil2}
                  alt="Opción Mi Perfil"
                ></img>
              </li>
            </ul>
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-4 text-slate-700">
          Gestionar Vehículos
        </h2>
        <p>
          En la sección de tu perfil, puedes añadir, editar o borrar vehículos:
        </p>
        <ol className="list-decimal list-inside">
          <li>
            Para añadir un nuevo vehículo:
            <ol className="list-decimal list-inside ml-4">
              <li>Haz clic en "Añadir Vehículo".</li>
              <ul className="mb-6 flex items-center justify-center">
                <li className="w-[90%]">
                  <img
                    className="shadow-xl"
                    src={Vehiculo1}
                    alt="Añadir Vehículo"
                  ></img>
                </li>
              </ul>
              <li>Rellena los detalles del vehículo en el formulario.</li>
              <li>
                Haz clic en "Guardar" para añadir el vehículo.
                <ul className="mb-6 flex items-center justify-center">
                  <li className="w-[90%]">
                    <img
                      className="shadow-xl"
                      src={Vehiculo2}
                      alt="Añadir Vehículo"
                    ></img>
                  </li>
                </ul>
              </li>
            </ol>
          </li>
          <li>
            Para editar un vehículo existente:
            <ol className="list-decimal list-inside ml-4">
              <li>
                Haz clic en el icono de lápiz junto al vehículo que deseas
                editar.
                <ul className="mb-6 flex items-center justify-center">
                  <li className="w-[90%]">
                    <img
                      className="shadow-xl"
                      src={EditarVehiculo1}
                      alt="Editar Vehículo"
                    ></img>
                  </li>
                </ul>
              </li>

              <li>Modifica los detalles en el formulario.</li>
              <li>
                Haz clic en "Guardar" para actualizar la información del
                vehículo.
                <ul className="mb-6 flex items-center justify-center">
                  <li className="w-[90%]">
                    <img
                      className="shadow-xl"
                      src={EditarVehiculo2}
                      alt="Editar Vehículo"
                    ></img>
                  </li>
                </ul>
              </li>
            </ol>
          </li>
          <li>
            Para borrar un vehículo:
            <ol className="list-decimal list-inside ml-4">
              <li>
                Haz clic en el icono de basura junto al vehículo que deseas
                borrar.
                <ul className="mb-6 flex items-center justify-center">
                  <li className="w-[90%]">
                    <img
                      className="shadow-xl"
                      src={EliminarVehiculo1}
                      alt="Borrar Vehículo"
                    ></img>
                  </li>
                </ul>
              </li>

              <li>
                Confirma la acción en el diálogo de confirmación.
                <ul className="mb-6 flex items-center justify-center">
                  <li className="w-[90%]">
                    <img
                      className="shadow-xl"
                      src={EliminarVehiculo2}
                      alt="Borrar Vehículo"
                    ></img>
                  </li>
                </ul>
              </li>
            </ol>
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-4 text-slate-700">
          Editar Perfil de Usuario
        </h2>
        <p>Para editar los detalles de tu perfil:</p>
        <ol className="list-decimal list-inside">
          <li>
            Haz clic en el icono de tres puntitos en la esquina superior derecha
            de tu perfil.
          </li>
          <li>
            Selecciona "Editar Perfil".
            <ul className="mb-6 flex items-center justify-center">
              <li className="w-[90%]">
                <img
                  className="shadow-xl"
                  src={EditarPerfil1}
                  alt="Editar Perfil"
                ></img>
              </li>
            </ul>
          </li>
          <li>
            Modifica los detalles en el formulario y haz clic en "Guardar" para
            actualizar tu perfil.
            <ul className="mb-6 flex items-center justify-center">
              <li className="w-[90%]">
                <img
                  className="shadow-xl"
                  src={EditarPerfil2}
                  alt="Editar Perfil"
                ></img>
              </li>
            </ul>
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-4 text-slate-700">
          Borrar Cuenta
        </h2>
        <p>Para borrar tu cuenta:</p>
        <ol className="list-decimal list-inside">
          <li>
            Haz clic en el icono de tres puntitos en la esquina superior derecha
            de tu perfil.
            <ul className="mb-6 flex items-center justify-center">
              <li className="w-[90%]">
                <img
                  className="shadow-xl"
                  src={EliminarCuenta1}
                  alt="Menú de tres puntos"
                ></img>
              </li>
            </ul>
          </li>
          <li>Selecciona "Eliminar Cuenta".</li>
          <li>
            Confirma la acción en el diálogo de confirmación. Ten en cuenta que
            esta acción es irreversible.
            <ul className="mb-6 flex items-center justify-center">
              <li className="w-[90%]">
                <img
                  className="shadow-xl"
                  src={EliminarCuenta2}
                  alt="Borrar Cuenta"
                ></img>
              </li>
            </ul>
          </li>
        </ol>
      </div>
      <Pie />
    </>
  );
}
