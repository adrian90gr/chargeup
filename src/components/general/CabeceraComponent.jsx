import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import UsuarioService from "../../services/UsuarioService";
import Logotipo from "../../../public/icons/logotipoChargeUp.png";



export default function Cabecera() {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      UsuarioService.getUsuarioActual()
        .then((response) => {
          setUser(response.data); 
        })
        .catch((error) => {
          console.error("Error al obtener los detalles del usuario:", error);
        });
    }
  }, []);

  const handleNavMenuToggle = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <header className="h-28 bg-slate-700 px-12 flex items-center  justify-between relative">
      <nav
        className={`order-1 ${
          AuthService.isAuthenticated()
            ? "justify-center  md:justify-start md:w-auto "
            : "justify-center "
        } flex w-full`}
      >
        <Link to="/home">
          <img
            className="w-20"
            src={Logotipo}
            alt="Logotipo"
          />
        </Link>
      </nav>

      {AuthService.isAuthenticated() && (
        <button
          data-collapse-toggle="navbar-user"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 relative"
          aria-controls="navbar-user"
          aria-expanded="false"
          onClick={handleNavMenuToggle}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-10 h-10"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      )}

      {AuthService.isAuthenticated() && (
        <nav
          className={`  order-0 md:order-1 md:flex md:items-center md:justify-center absolute top-[96px] left-0 z-20 shadow-md w-full md:w-auto md:static md:shadow-none ${
            isNavMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="  border border-gray-600 md:border-none rounded-b-2xl bg-slate-700 flex flex-col p-4 md:p-0 mt-4 md:mt-0 md:space-x-8 rtl:space-x-reverse md:flex-row">
            
            <Link to="/mapa">
              <li className="hover:bg-slate-800 p-2 rounded-md ">
                <p className="text-white text-xl block hover:bg-slate-800 md:p-0">
                  Nuestras Estaciones
                </p>
              </li>
            </Link>

            <Link to="/ayuda">
              <li className="  hover:bg-slate-800 p-2 rounded-2xl">
                <p className="text-white text-xl block hover:bg-slate-800 md:p-0">
                  Ayuda
                </p>
              </li>
            </Link>

            <Link to="/nuestrocompromiso">
              <li className="hover:bg-slate-800 p-2 rounded-md">
                <p className="text-white text-xl block hover:bg-slate-800 md:p-0">
                  Nuestro Compromiso
                </p>
              </li>
            </Link>
            
          </ul>
        </nav>
      )}

      {AuthService.isAuthenticated() && (
        <div className="relative order-2">
          <button
            id="dropdownUserAvatarButton"
            onClick={handleUserMenuToggle}
            className="h-14 w-14 flex text-sm bg-gray-800 rounded-full "
            type="button"
          >
            <span className="sr-only">Open user menu</span>
            <div
              className="w-14 h-14"
              style={{
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff",
              }}
            >
              {user && user.foto ? (
                <img
                  src={`data:image/jpeg;base64,${user.foto}`}
                  alt="user photo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <img
                  src="../../src/assets/icons/IconoPerfilUsuario.svg"
                  alt="user photo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          </button>

          {isUserMenuOpen && (
            <div
              id="dropdownAvatar"
              className="absolute top-24 -left-36 w-60 bg-slate-700 divide-y divide-gray-600 rounded-md shadow z-20 border-2 border-gray-600"
            >
              <div className="text-lg px-4 py-3 text-white">
                <div>{user && user.nombre}</div>
                <div className="font-medium truncate">
                  {user && user.correo}
                </div>
              </div>
              <ul
                className="py-2 text-sm text-gray-200"
                aria-labelledby="dropdownUserAvatarButton"
              >
                <Link to="/perfilusuario">
                  <li>
                    <div className="block px-4 py-2 text-lg hover:bg-slate-800">
                      Mi perfil
                    </div>
                  </li>
                </Link>

                {user && user.admin && (
                  <Link to="/paneladministrador">
                    <li>
                      <div className="block px-4 py-2 text-lg hover:bg-slate-800">
                        Panel de administrador
                      </div>
                    </li>
                  </Link>
                )}
              </ul>
              <div className="py-2">
                <Link to="/">
                  <div
                    onClick={logout}
                    className="block px-4 py-2 text-lg text-white hover:bg-slate-800"
                  >
                    Sign out
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
