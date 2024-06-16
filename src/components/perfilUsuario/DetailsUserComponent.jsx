import React, { useEffect, useState } from "react";
import { Button, Menu, MenuItem, IconButton, Typography } from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import UsuarioService from "../../services/UsuarioService";
import VehiculoService from "../../services/VehiculoService";
import CardUserComponent from "./CardUserComponent";
import EditUserModalComponent from "./EditUserModalComponent";
import TablaVehiculosUserComponent from "./TablaVehiuclosUserComponent";
import AuthService from "../../services/AuthService";
import ConfirmModalComponent from "./ConfirmModalComponent";
import { useNavigate } from "react-router-dom";

export const DetailsUser = () => {
  const [user, setUser] = useState(null);
  const [vehiculos, setVehiculos] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    UsuarioService.getUsuarioActual().then((response) => {
      setUser(response.data);
    });

    VehiculoService.getAllVehiculos().then((response) => {
      setVehiculos(response.data);
    });
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    setEditModalOpen(true);
    handleMenuClose();
  };

  const handleDeleteAccount = () => {
    setConfirmModalOpen(true);
    handleMenuClose();
  };

  const confirmDeleteAccount = () => {
    UsuarioService.deleteUsuario(user.id).then(() => {
      AuthService.logout();
      navigate("/login");
    });
  };

  const handleEditVehiculo = (id) => {
    // Lógica para editar vehículo
  };

  const handleDeleteVehiculo = (id) => {
    VehiculoService.eliminarVehiculo(id).then(() => {
      setVehiculos(vehiculos.filter((vehiculo) => vehiculo.id !== id));
    });
  };

  const handleUserUpdate = () => {
    UsuarioService.getUsuarioActual().then((response) => {
      setUser(response.data);
    });
  };

  if (!user) return <div>Cargando...</div>;

  return (
    <div className="flex flex-col items-center p-4 w-full">
      <div className="w-[60%] flex justify-end  mb-4">
        <IconButton sx={{color:'black'}} onClick={handleMenuOpen}>
          <MoreVertIcon sx={{fontSize:'35px'}} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditProfile}>Editar perfil</MenuItem>
          <MenuItem onClick={handleDeleteAccount}>Eliminar cuenta</MenuItem>
        </Menu>
      </div>
      <CardUserComponent user={user} />
      <TablaVehiculosUserComponent
        vehiculos={vehiculos}
        onEditVehiculo={handleEditVehiculo}
        onDeleteVehiculo={handleDeleteVehiculo}
      />
      <EditUserModalComponent
        user={user}
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onUserUpdate={handleUserUpdate}
      />
      <ConfirmModalComponent
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={confirmDeleteAccount}
        title="Confirmar eliminación"
        description="¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer."
      />
    </div>
  );
};
