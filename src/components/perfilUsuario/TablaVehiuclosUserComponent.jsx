import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Collapse,
  Box,
} from "@mui/material";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Edit,
  Delete,
  Add,
} from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import VehiculoService from "../../services/VehiculoService";
import UsuarioService from "../../services/UsuarioService";
import EditVehiculoModalComponent from "./EditVehiculoModalComponent";
import CreateVehiculoModalComponent from "./CreateVehiculoModalComponent";
import ConfirmModalComponent from "./ConfirmModalComponent";

const TablaVehiculosUserComponent = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [vehiculoToDelete, setVehiculoToDelete] = useState(null);
  const isMobileView = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    fetchVehiculos();
  }, []);

  // Fetch the vehicles associated with the logged-in user
  const fetchVehiculos = () => {
    setLoading(true);
    UsuarioService.getUsuarioActual()
      .then((response) => {
        const usuarioId = response.data.id;
        return VehiculoService.getVehiculosByUsuario(usuarioId);
      })
      .then((response) => {
        setVehiculos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
        setLoading(false);
      });
  };

  // Handle row expansion/collapse for mobile view
  const handleRowClick = (matricula) => {
    const currentIndex = expandedRows.indexOf(matricula);
    const newExpandedRows = [...expandedRows];

    if (currentIndex === -1) {
      newExpandedRows.push(matricula);
    } else {
      newExpandedRows.splice(currentIndex, 1);
    }

    setExpandedRows(newExpandedRows);
  };

  const isRowExpanded = (matricula) => {
    return expandedRows.indexOf(matricula) !== -1;
  };

  // Open the edit vehicle modal
  const handleEditVehiculo = (matricula) => {
    const vehiculo = vehiculos.find((v) => v.matricula === matricula);
    setSelectedVehiculo(vehiculo);
    setEditModalOpen(true);
  };

  // Close the edit vehicle modal
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedVehiculo(null);
  };

  // Refresh the vehicle list after update
  const handleVehiculoUpdate = () => {
    fetchVehiculos();
  };

  // Open the create vehicle modal
  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  // Close the create vehicle modal
  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  // Refresh the vehicle list after creation
  const handleVehiculoCreated = () => {
    handleVehiculoUpdate();
    handleCloseCreateModal();
  };

  // Open the confirm delete modal
  const handleConfirmDelete = (vehiculo) => {
    setVehiculoToDelete(vehiculo);
    setConfirmDeleteOpen(true);
  };

  // Confirm vehicle deletion
  const confirmDeleteVehiculo = () => {
    VehiculoService.eliminarVehiculo(vehiculoToDelete.matricula)
      .then(() => {
        setConfirmDeleteOpen(false);
        fetchVehiculos();
      })
      .catch((error) => {
        console.error("Error deleting vehicle:", error);
      });
  };

  if (loading) {
    return <Typography variant="body1">Cargando...</Typography>;
  }

  return (
    <div className="w-full mt-8">
      <Typography variant="h5" className="mb-4">
        Mis Vehículos
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleOpenCreateModal}
      >
        Añadir Vehículo
      </Button>

      {vehiculos.length === 0 ? (
        <Typography variant="body1">
          Todavía no se han registrado vehículos.
        </Typography>
      ) : (
        <TableContainer className="mt-4" component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {isMobileView && <TableCell></TableCell>}
                <TableCell>Matricula</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Modelo</TableCell>
                {!isMobileView && (
                  <>
                    <TableCell>Año</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell>Acciones</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {vehiculos.map((vehiculo) => (
                <React.Fragment key={vehiculo.matricula}>
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    {isMobileView && (
                      <TableCell padding="checkbox">
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => handleRowClick(vehiculo.matricula)}
                        >
                          {isRowExpanded(vehiculo.matricula) ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )}
                        </IconButton>
                      </TableCell>
                    )}
                    <TableCell>{vehiculo.matricula}</TableCell>
                    <TableCell>{vehiculo.marca}</TableCell>
                    <TableCell>{vehiculo.modelo}</TableCell>
                    {!isMobileView && (
                      <>
                        <TableCell>{vehiculo.anio}</TableCell>
                        <TableCell>{vehiculo.categoria}</TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="edit vehicle"
                            color="primary"
                            onClick={() => handleEditVehiculo(vehiculo.matricula)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            aria-label="delete vehicle"
                            onClick={() => handleConfirmDelete(vehiculo)}
                            color="secondary"
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                  {isMobileView && (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <Collapse
                          in={isRowExpanded(vehiculo.matricula)}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box margin={1}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              component="div"
                            >
                              Detalles
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              <strong>Matricula:</strong> {vehiculo.matricula}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              <strong>Marca:</strong> {vehiculo.marca}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              <strong>Modelo:</strong> {vehiculo.modelo}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              <strong>Año:</strong> {vehiculo.anio}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              <strong>Categoria:</strong> {vehiculo.categoria}
                            </Typography>
                            <IconButton
                              aria-label="edit vehicle"
                              color="primary"
                              onClick={() => handleEditVehiculo(vehiculo.matricula)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              aria-label="delete vehicle"
                              onClick={() => handleConfirmDelete(vehiculo)}
                              color="secondary"
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {selectedVehiculo && (
        <EditVehiculoModalComponent
          vehiculo={selectedVehiculo}
          open={editModalOpen}
          onClose={handleCloseEditModal}
          onVehiculoUpdate={handleVehiculoUpdate}
        />
      )}
      <CreateVehiculoModalComponent
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onVehiculoCreated={handleVehiculoCreated}
      />
      <ConfirmModalComponent
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={confirmDeleteVehiculo}
        title="Confirmar eliminación"
        description="¿Estás seguro de que deseas eliminar este vehículo?"
      />
    </div>
  );
};

export default TablaVehiculosUserComponent;
