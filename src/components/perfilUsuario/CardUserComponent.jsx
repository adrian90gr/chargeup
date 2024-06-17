import React from "react";
import FotoUsuario from "../../assets/IconoPerfilUsuario.svg";
import { Typography } from "@mui/material";

const CardUserComponent = ({ user }) => {
  return (
    <div className="Card bg-slate-700 text-white p-6 my-5 rounded-lg shadow-lg w-full max-w-md md:w-1/2 mx-auto">
      <Typography variant="h4" className="text-center mb-6 font-bold">
        Datos de perfil
      </Typography>
      <div className="profile-details flex flex-col items-center gap-4">
        <div className="relative w-36 h-36">
          <img
            src={
              user.foto
                ? `data:image/jpeg;base64,${user.foto}`
                :FotoUsuario
            }
            alt={user.nombre}
            className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
        <div className=" space-y-2">
          <Typography variant="body1" className="w-full">
            <strong>Nombre:</strong> {user.nombre}
          </Typography>
          <Typography variant="body1" className="w-full">
            <strong>Apellidos:</strong> {user.apellidos}
          </Typography>
          <Typography variant="body1" className="w-full">
            <strong>Correo:</strong> {user.correo}
          </Typography>
          <Typography variant="body1" className="w-full">
            <strong>Teléfono:</strong> {user.telefono}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default CardUserComponent;
