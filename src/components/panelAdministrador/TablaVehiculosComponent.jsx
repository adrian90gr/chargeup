import React, { useState, useEffect } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton, Modal, Box, TextField, Button, Typography, Collapse, MenuItem,TableSortLabel} from '@mui/material';
import { Edit, Delete, Add, KeyboardArrowUp, Close,KeyboardArrowDown } from '@mui/icons-material';
import VehiculoService from '../../services/VehiculoService';
import UsuarioService from '../../services/UsuarioService';
import ConfirmModalComponent from './ConfirmModalComponent';
import { BreadCrumbsComponent } from '../general/BreadCrumbsComponent';


const TablaVehiculos = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [vehiculos, setVehiculos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const categorias = ["Turismo", "Suv", "Mixto", "Otro"];
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [formData, setFormData] = useState({
    matricula: "",
    usuario: "",
    marca: "",
    modelo: "",
    anio: "",
    categoria: "",
  });
  const [errors, setErrors] = useState({
    matricula: "",
    marca: "",
    modelo: "",
    anio: "",
    categoria: "",
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchVehiculos = () => {
    VehiculoService.getAllVehiculos()
      .then((response) => {
        setVehiculos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehiculos:", error);
      });
  };

  const fetchUsuarios = () => {
    UsuarioService.getAllUsuarios()
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Error fetching usuarios:", error);
      });
  };

  useEffect(() => {
    fetchVehiculos();
    fetchUsuarios();
  }, []);

  const handleDeleteVehiculo = (matricula) => {
    setConfirmAction(() => () => {
      VehiculoService.eliminarVehiculo(matricula)
        .then(() => {
          fetchVehiculos();
          setConfirmModalOpen(false);
        })
        .catch((error) => {
          console.error("Error al borrar el vehiculo:", error);
        });
    });
    setConfirmModalOpen(true);
  };

  const handleEditVehiculo = (vehiculo) => {
    setSelectedVehiculo(vehiculo);
    setFormData({
      matricula: vehiculo.matricula,
      usuario: vehiculo.usuario,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      anio: vehiculo.anio,
      categoria: vehiculo.categoria,
    });

    setErrors({
      matricula: "",
      marca: "",
      modelo: "",
      anio: "",
      categoria: "",
    });
    setEditModalOpen(true);
  };

  const handleCreateVehiculo = () => {
    setSelectedVehiculo(null);
    setFormData({
      matricula: "",
      usuario: "",
      marca: "",
      modelo: "",
      anio: "",
      categoria: "",
    });
    setErrors({
      matricula: "",
      marca: "",
      modelo: "",
      anio: "",
      categoria: "",
    });
    setCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setCreateModalOpen(false);
    setSelectedVehiculo(null);
    setFormData({
      matricula: "",
      usuario: "",
      marca: "",
      modelo: "",
      anio: "",
      categoria: "",
    });
    setErrors({
      matricula: "",
      marca: "",
      modelo: "",
      anio: "",
      categoria: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateMatricula = (matricula) => {
    const matriculaCocheAntiguo = /^\d{4}[BCDFGHJKLMNPRSTVWXYZ]{3}$/;
    const matriculaCocheNuevo = /^[A-PR-UW-Z]{1,2}\d{4}[A-PR-UW-Z]{1,2}$/;
    return (
      matriculaCocheAntiguo.test(matricula) ||
      matriculaCocheNuevo.test(matricula)
    );
  };

  const validateAnio = (anio) => {
    const currentYear = new Date().getFullYear();
    return /^\d{4}$/.test(anio) && anio >= 1900 && anio <= currentYear;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { matricula, anio } = formData;
    let validationErrors = {};

    if (!validateMatricula(matricula)) {
      validationErrors.matricula =
        "Matrícula inválida. Debe ser una matrícula española válida.";
    }

    if (!validateAnio(anio)) {
      validationErrors.anio =
        "Año inválido. Debe ser un número de 4 cifras entre 1900 y el año actual.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({
      matricula: "",
      marca: "",
      modelo: "",
      anio: "",
      categoria: "",
    });

    const updatedData = { ...formData };

    if (selectedVehiculo) {
      setConfirmAction(() => () => {
        VehiculoService.actualizarVehiculo(
          selectedVehiculo.matricula,
          updatedData
        )
          .then(() => {
            fetchVehiculos();
            handleCloseModal();
            setConfirmModalOpen(false);
          })
          .catch((error) => {
            console.error("Error al actualizar vehiculo:", error);
          });
      });
    } else {
      setConfirmAction(() => () => {
        VehiculoService.crearVehiculo(updatedData)
          .then(() => {
            console.log("Vehiculo creado satisfactoriamente");
            fetchVehiculos();
            handleCloseModal();
            setConfirmModalOpen(false);
          })
          .catch((error) => {
            console.error("Error al crear vehiculo:", error);
          });
      });
    }
    setConfirmModalOpen(true);
  };

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

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedVehiculos = vehiculos.sort((a, b) => {
    return order === "asc"
      ? a[orderBy] < b[orderBy]
        ? -1
        : 1
      : a[orderBy] > b[orderBy]
      ? -1
      : 1;
  });

  return (
    <>
      <BreadCrumbsComponent></BreadCrumbsComponent>
      <Paper className="overflow-hidden m-1">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleCreateVehiculo}
          sx={{ margin: 2 }}
        >
          Crear Vehiculo
        </Button>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />

                <TableCell
                  sortDirection={orderBy === "matricula" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "matricula"}
                    direction={orderBy === "matricula" ? order : "asc"}
                    onClick={() => handleRequestSort("matricula")}
                  >
                    Matrícula
                  </TableSortLabel>
                </TableCell>

                <TableCell sortDirection={orderBy === "marca" ? order : false}>
                  <TableSortLabel
                    active={orderBy === "marca"}
                    direction={orderBy === "marca" ? order : "asc"}
                    onClick={() => handleRequestSort("marca")}
                  >
                    Marca
                  </TableSortLabel>
                </TableCell>

                <TableCell sortDirection={orderBy === "modelo" ? order : false}>
                  <TableSortLabel
                    active={orderBy === "modelo"}
                    direction={orderBy === "modelo" ? order : "asc"}
                    onClick={() => handleRequestSort("modelo")}
                  >
                    Modelo
                  </TableSortLabel>
                </TableCell>

                {!isMobileView && (
                  <>
                    <TableCell>Usuario</TableCell>
                    <TableCell>Año</TableCell>
                    <TableCell>Categoría</TableCell>
                    <TableCell>Acciones</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedVehiculos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((vehiculo) => (
                  <React.Fragment key={vehiculo.matricula}>
                    <TableRow>
                      <TableCell>
                        {isMobileView && (
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => handleRowClick(vehiculo.matricula)}
                          >
                            {expandedRows.indexOf(vehiculo.matricula) > -1 ? (
                              <KeyboardArrowUp />
                            ) : (
                              <KeyboardArrowDown />
                            )}
                          </IconButton>
                        )}
                      </TableCell>

                      <TableCell>{vehiculo.matricula}</TableCell>
                      <TableCell>{vehiculo.marca}</TableCell>
                      <TableCell>{vehiculo.modelo}</TableCell>

                      {!isMobileView && (
                        <>
                          <TableCell>{vehiculo.usuario}</TableCell>
                          <TableCell>{vehiculo.anio}</TableCell>
                          <TableCell>{vehiculo.categoria}</TableCell>
                          <TableCell>
                            <IconButton
                              color="primary"
                              onClick={() => handleEditVehiculo(vehiculo)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={() =>
                                handleDeleteVehiculo(vehiculo.matricula)
                              }
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                    {isMobileView && (
                      <TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={8}
                        >
                          <Collapse
                            in={expandedRows.indexOf(vehiculo.matricula) > -1}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box margin={1}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                              >
                                Detalles del Vehículo
                              </Typography>
                              <Typography variant="body1">
                                Matrícula: {vehiculo.matricula}
                              </Typography>
                              <Typography variant="body1">
                                Usuario: {vehiculo.usuario}
                              </Typography>
                              <Typography variant="body1">
                                Marca: {vehiculo.marca}
                              </Typography>
                              <Typography variant="body1">
                                Modelo: {vehiculo.modelo}
                              </Typography>
                              <Typography variant="body1">
                                Año: {vehiculo.anio}
                              </Typography>
                              <Typography variant="body1">
                                Categoría: {vehiculo.categoria}
                              </Typography>
                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Edit />}
                                onClick={() => handleEditVehiculo(vehiculo)}
                                sx={{ margin: 1 }}
                              >
                                Editar
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<Delete />}
                                onClick={() =>
                                  handleDeleteVehiculo(vehiculo.matricula)
                                }
                                sx={{ margin: 1 }}
                              >
                                Eliminar
                              </Button>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={vehiculos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="flex flex-col items-center  "
          />
        </TableContainer>
        <Modal
          className="flex flex-col items-center justify-center"
          open={isEditModalOpen || isCreateModalOpen}
          onClose={handleCloseModal}
        >
          <Box className="shadow-lg outline-0 absolute bg-white p-8 w-5/6 md:w-1/2 h-5/6 max-h-[700px] rounded-xl overflow-auto">
            <Typography variant="h6" component="h2">
              {selectedVehiculo ? "Editar Vehículo" : "Crear Vehículo"}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Matrícula"
                name="matricula"
                value={formData.matricula}
                onChange={handleChange}
                error={!!errors.matricula}
                helperText={errors.matricula}
                fullWidth
                margin="normal"
              />
              <TextField
                select
                label="Usuario"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                fullWidth
                margin="normal"
              >
                {usuarios.map((usuario) => (
                  <MenuItem key={usuario.id} value={usuario.id}>
                    {usuario.id}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Marca"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                error={!!errors.marca}
                helperText={errors.marca}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Modelo"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                error={!!errors.modelo}
                helperText={errors.modelo}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Año"
                name="anio"
                value={formData.anio}
                onChange={handleChange}
                error={!!errors.anio}
                helperText={errors.anio}
                fullWidth
                margin="normal"
              />
              <TextField
                select
                label="Categoría"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                error={!!errors.categoria}
                helperText={errors.categoria}
                fullWidth
                margin="normal"
              >
                {categorias.map((usuarios) => (
                  <MenuItem key={usuarios} value={usuarios}>
                    {usuarios}
                  </MenuItem>
                ))}
              </TextField>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                  onClick={handleCloseModal}
                  sx={{ marginRight: 2 }}
                  startIcon={<Close />}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  {selectedVehiculo ? "Guardar" : "Crear"}
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
        <ConfirmModalComponent
          open={isConfirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          onConfirm={() => {
            if (confirmAction) confirmAction();
          }}
          title="Confirmación"
          description="¿Está seguro de que desea realizar esta acción?"
        />
      </Paper>
    </>
  );
};

export default TablaVehiculos;
