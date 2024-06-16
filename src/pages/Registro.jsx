import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Cabecera from "../components/general/CabeceraComponent";
import { Button } from "flowbite-react";
import RegisterService from "../services/RegisterService";

const RegistroUsuario = () => {//Creamos usuario y reseteamos a vacio inicialmente
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    telefono: "",
    contraseña: "",
  });

  const [registroExitoso, setRegistroExitoso] = useState(false);//Aqui mostramos si el registro es exitoso o no
  const [error, setError] = useState(null); //Aqui marcamos los errores

  const actualizaCampo = (evento) => {//Aqui se actualiza los campos al rellenarlos
    const { name, value } = evento.target;
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submit = async (evento) => { //Funcion submit para enviar los datos
    evento.preventDefault();

    try {
      await RegisterService.register(usuario);//Llamamos al servicio para registrarse con los datos del usuario
      setRegistroExitoso(true);
      setUsuario({//En caso exitoso te registrarasy y seteamos a vacio el usuario para volver a registrar a otro usuario
        nombre: "",
        apellidos: "",
        correo: "",
        telefono: "",
        contraseña: "",
      });
    } catch (error) {//En caso contrario, muestra error
      console.error("Error al registrar usuario:", error.message);
      alert(
        "Hubo un error al registrar al usuario. Por favor, inténtalo de nuevo."
      );
      setError(error.message);
    }
  };

  if (registroExitoso) {//Si se registra correctamente te redirige a login
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Cabecera />
      <body className="flex flex-col items-center">
        <div className="w-3/4 md:w-3/5 mt-24 bg-slate-700 p-8 rounded-xl ">
          <h1 className="text-3xl mb-4 text-white">Registro de Usuario</h1>
          <form onSubmit={submit}>
            {error && <p className="text-red-500">{error}</p>}{/*Si hay algun eror en algun campo te lo marcara en formuario*/ }
            <div className="mb-4">
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-white"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={usuario.nombre}
                onChange={actualizaCampo}
                className="form-input mt-1 block w-full rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="apellidos"
                className="block text-sm font-medium text-white"
              >
                Apellidos
              </label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                value={usuario.apellidos}
                onChange={actualizaCampo}
                className="form-input mt-1 block w-full rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="correo"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={usuario.correo}
                onChange={actualizaCampo}
                className="form-input mt-1 block w-full rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="telefono"
                className="block text-sm font-medium text-white"
              >
                Telefono
              </label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={usuario.telefono}
                onChange={actualizaCampo}
                className="form-input mt-1 block w-full rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contraseña"
                className="block text-sm font-medium text-white"
              >
                Contraseña
              </label>
              <input
                autoComplete="current-password"
                type="password"
                id="contraseña"
                name="contraseña"
                value={usuario.contraseña}
                onChange={actualizaCampo}
                className="form-input mt-1 block w-full rounded-md"
              />
            </div>
            <div>
              <Button
                type="submit"
                size="lg"
                className="focus:outline-none bg-cyan-500 hover:bg-cyan-400 p-2 my-4"
              >
                Enviar
              </Button>
            </div>
          </form>
          <Link className="text-white text-lg" to={"/"}>
            Volver
          </Link>
        </div>
      </body>
    </>
  );
};

export default RegistroUsuario;
