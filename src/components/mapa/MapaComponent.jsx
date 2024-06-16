import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { FaSearch, FaFilter } from "react-icons/fa";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import EstacionService from "../../services/EstacionService";
import "../../css/modal.css";

Modal.setAppElement("#root");

const containerStyle = {
  width: "100%",
  height: "400px",
};

const initialCenter = {
  lat: 37.38283,
  lng: -5.97317,
};

const MapComponent = () => {
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const mapRef = useRef(null);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Recibo las estaciones de la API
  useEffect(() => {
    EstacionService.getAllEstaciones()
      .then((response) => {
        const estaciones = response.data.map((estacion) => ({
          id: estacion.id,
          nombre: estacion.nombre,
          lat: parseFloat(estacion.latitud),
          lng: parseFloat(estacion.longitud),
          npuntoscarga: estacion.npuntoscarga,
          fechaConstruccion: estacion.fecha_construccion,
          foto: estacion.foto,
        }));
        setLocations(estaciones);
        setFilteredLocations(estaciones);
      })
      .catch((error) => {
        console.error("Error fetching estaciones", error);
      });
  }, []);

  // Filtro de búsqueda de estaciones
  useEffect(() => {
    setFilteredLocations(
      locations.filter((location) =>
        location.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setCurrentPage(1); // Resetear a la primera página después de buscar
  }, [searchTerm, locations]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMouseOver = (location) => {
    setSelectedLocation(location);
  };

  const handleMouseOut = () => {
    setSelectedLocation(null);
  };

  const handleTableClick = (location) => {
    setMapCenter({ lat: location.lat, lng: location.lng });
    if (mapRef.current) {
      mapRef.current.panTo({ lat: location.lat, lng: location.lng });
      mapRef.current.setZoom(15);
    }
  };

  const handleMapLoad = (map) => {
    mapRef.current = map;
  };

  const handleMarkerClick = (location) => {
    setModalData(location);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalData(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSaveIdToCookie = (id) => {
    Cookies.set("estacionId", id, { expires: 7 }); // Guarda el id en una cookie por 7 días
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLocations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);

  return (
    <div className="flex flex-col items-center h-screen relative">
      <LoadScript googleMapsApiKey="AIzaSyAuIpWSK30sZ41sfY1ASYlxDpebsn179HE">
        {/* Mapa y configuración de mapa */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={10}
          onLoad={handleMapLoad}
          options={
            window.google
              ? {
                  mapTypeControl: true,
                  mapTypeControlOptions: {
                    style: window.google.maps.MapTypeControlStyle.DEFAULT,
                    position: window.google.maps.ControlPosition.BOTTOM_CENTER,
                    mapTypeIds: [
                      window.google.maps.MapTypeId.ROADMAP,
                      window.google.maps.MapTypeId.SATELLITE,
                    ],
                  },
                }
              : {}
          }
        >
          {/* Input de búsqueda de estaciones */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-lg w-80 p-2 z-2 flex items-center">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearch}
              className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <button className="p-2 bg-slate-700 text-white rounded-lg ml-2">
              <FaFilter />
            </button>
          </div>

          {/* Sugerencias de búsqueda */}
          {searchTerm && (
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-lg w-80 max-w-xs sm:max-w-md lg:max-w-lg p-2 z-10 mt-1">
              {filteredLocations.length ? (
                <ul>
                  {filteredLocations.map((location) => (
                    <li
                      key={location.id}
                      className="p-2 border-b last:border-0 cursor-pointer"
                      onClick={() => handleTableClick(location)}
                    >
                      {location.nombre}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-2">No se encontraron resultados.</p>
              )}
            </div>
          )}

          {/* Marcador de localización */}
          {locations.map((location) => (  // Cambiar currentItems a locations aquí
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              onMouseOver={() => handleMouseOver(location)}
              onMouseOut={handleMouseOut}
              onClick={() => handleMarkerClick(location)} // Aquí se llama a handleMarkerClick
            >
              {/* Ventana de información de la ubicación */}
              {selectedLocation && selectedLocation.id === location.id && (
                <InfoWindow position={{ lat: location.lat, lng: location.lng }}>
                  <div>
                    {location.foto && (
                      <div className="flex flex-col items-center justify-center w-100">
                        <img
                          src={`data:image/jpeg;base64,${location.foto}`}
                          alt=""
                          style={{
                            width: "50px",
                            height: "auto",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}

                    {!location.foto && (
                      <div className="flex flex-col items-center justify-center w-100">
                        <img
                          src="../../../src/assets/icons/cargador.svg"
                          alt=""
                          style={{
                            width: "50px",
                            height: "auto",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}

                    <h1>{location.nombre}</h1>
                    <div className="flex">
                      <p>Nº Puntos de carga: </p>
                      {location.npuntoscarga}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </LoadScript>

      {/* Tabla de estaciones */}
      <div className="mt-4 w-full max-w-4xl  rounded-lg">
        <div className="bg-white shadow-md rounded-xl">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-slate-700 text-white">
              <tr>
                <th className="border px-4 py-2">Nombre</th>
                <th className="border px-4 py-2">Numero de Estación</th>
                <th className="border px-4 py-2">Nº de Puntos de Carga</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((location) => (
                <tr
                  key={location.id}
                  onClick={() => handleTableClick(location)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="border px-4 py-2">{location.nombre}</td>
                  <td className="border px-4 py-2">
                    {location.id}
                  </td>
                  <td className="border px-4 py-2">{location.npuntoscarga}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Controles de paginación */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 m-2 bg-slate-700 text-white rounded-lg"
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`p-2 m-2 ${
                currentPage === index + 1
                  ? "bg-slate-700 text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-lg`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 m-2  bg-slate-700 text-white rounded-lg"
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Modal para mostrar detalles de la estación */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Estación de Servicio"
        className="modal z-10"
        overlayClassName="modal-overlay"
      >
        {modalData && (
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">{modalData.nombre}</h2>
            {modalData.foto && (
              <img
                src={`data:image/jpeg;base64,${modalData.foto}`}
                alt={modalData.nombre}
                className="w-full h-auto my-4 rounded-xl"
              />
            )}

            {!modalData.foto && (
              <img
                src="../../../src/assets/icons/cargador.svg"
                alt={modalData.nombre}
                className="w-full h-auto my-4 rounded-xl"
              />
            )}
            <div className="flex mb-2">
              <h3 className="font-semibold mr-2">Fecha de construcción:</h3>
              <p>{modalData.fechaConstruccion}</p>
            </div>
            <div className="flex mb-2">
              <h3 className="font-semibold mr-2">Número de puntos de carga:</h3>
              <p>{modalData.npuntoscarga}</p>
            </div>
            <div className="flex justify-around mt-4">
              <button
                onClick={closeModal}
                className="p-2 bg-red-500 text-white rounded-lg"
              >
                Cerrar
              </button>
              <Link to="/mapa/detallesestacion">
                <button
                  onClick={() => {
                    handleSaveIdToCookie(modalData.id);
                    closeModal();
                  }}
                  className="p-2 bg-slate-700 text-white rounded-lg"
                >
                  Ver Detalles
                </button>
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MapComponent;
