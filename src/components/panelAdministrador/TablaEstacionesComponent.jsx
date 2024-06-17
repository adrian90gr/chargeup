import React, { useState, useEffect } from "react";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,TablePagination,IconButton,Modal,Box,TextField,Button,Collapse,Typography,TableSortLabel} from "@mui/material";
import {Edit,Delete,Add,KeyboardArrowUp,KeyboardArrowDown} from "@mui/icons-material";
import EstacionService from "../../services/EstacionService";
import ConfirmModalComponent from "./ConfirmModalComponent";
import { BreadCrumbsComponent } from "../general/BreadCrumbsComponent";
import Cargador from "../../assets/cargador.svg";

const TablaEstaciones = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [estaciones, setEstaciones] = useState([]);
  const [selectedEstacion, setSelectedEstacion] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    latitud: "",
    longitud: "",
    foto: null,
    fotoURL: "",
    fecha_construccion: "",
    npuntoscarga: "",
    eliminarFoto: false,
  });
  const [errors, setErrors] = useState({});
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const today = new Date().toISOString().split("T")[0];

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

  const fetchEstaciones = () => {
    EstacionService.getAllEstaciones()
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setEstaciones(response.data);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching estaciones:", error);
      });
  };

  useEffect(() => {
    fetchEstaciones();
  }, []);

  const handleDeleteEstacion = (id) => {
    setConfirmAction(() => () => {
      EstacionService.eliminarEstacion(id)
        .then(() => {
          fetchEstaciones();
          setConfirmModalOpen(false);
        })
        .catch((error) => {
          console.error("Error deleting estacion:", error);
        });
    });
    setConfirmModalOpen(true);
  };

  const handleEditEstacion = (estacion) => {
    setSelectedEstacion(estacion);
    setFormData({
      nombre: estacion.nombre,
      latitud: estacion.latitud,
      longitud: estacion.longitud,
      foto: null,
      fotoURL: estacion.foto ? `data:image/jpeg;base64,${estacion.foto}` : "",
      fecha_construccion: estacion.fecha_construccion,
      npuntoscarga: estacion.npuntoscarga,
      eliminarFoto: false,
    });
    setEditModalOpen(true);
  };

  const handleCreateEstacion = () => {
    setSelectedEstacion(null);
    setFormData({
      nombre: "",
      latitud: "",
      longitud: "",
      foto: null,
      fotoURL: "",
      fecha_construccion: "",
      npuntoscarga: "",
      eliminarFoto: false,
    });
    setCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setCreateModalOpen(false);
    setSelectedEstacion(null);
    setFormData({
      nombre: "",
      latitud: "",
      longitud: "",
      foto: null,
      fotoURL: "",
      fecha_construccion: "",
      npuntoscarga: "",
      eliminarFoto: false,
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedEstacion) {
      if (!formData.nombre.trim())
        newErrors.nombre = "El nombre es obligatorio";
      if (!formData.latitud.trim())
        newErrors.latitud = "La latitud es obligatoria";
      if (formData.latitud.length > 20)
        newErrors.latitud = "Máximo 20 caracteres";
      if (!formData.longitud.trim())
        newErrors.longitud = "La longitud es obligatoria";
      if (formData.longitud.length > 20)
        newErrors.longitud = "Máximo 20 caracteres";
      if (!formData.fecha_construccion.trim())
        newErrors.fecha_construccion =
          "La fecha de construcción es obligatoria";
      if (!formData.npuntoscarga) {
        newErrors.npuntoscarga = "El número de puntos de carga es obligatorio";
      } else if (formData.npuntoscarga <= 0) {
        newErrors.npuntoscarga = "Debe ser un número positivo";
      }
    } else {
      if (formData.latitud && formData.latitud.length > 20)
        newErrors.latitud = "Máximo 20 caracteres";
      if (formData.longitud && formData.longitud.length > 20)
        newErrors.longitud = "Máximo 20 caracteres";
      if (formData.npuntoscarga && formData.npuntoscarga <= 0)
        newErrors.npuntoscarga = "Debe ser un número positivo";
      if (formData.fecha_construccion && formData.fecha_construccion > today) {
        newErrors.fecha_construccion =
          "La fecha de construcción no puede ser posterior a hoy";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        foto: file,
        fotoURL: URL.createObjectURL(file),
        eliminarFoto: false,
      });
    }
  };

  const handleDeleteFoto = () => {
    setFormData({
      ...formData,
      foto: null,
      fotoURL: "",
      eliminarFoto: true,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== "" && formData[key] !== null) {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    const confirmMessage = selectedEstacion
      ? "¿Está seguro de que desea actualizar esta estación?"
      : "¿Está seguro de que desea crear esta estación?";

    setConfirmAction(() => () => {
      if (selectedEstacion) {
        if (formData.foto) {
          formDataToSubmit.append("foto", formData.foto);
        } else if (formData.eliminarFoto) {
          formDataToSubmit.append("eliminarFoto", true);
        }

        EstacionService.actualizarEstacion(
          selectedEstacion.id,
          formDataToSubmit
        )
          .then(() => {
            fetchEstaciones();
            handleCloseModal();
            setConfirmModalOpen(false);
          })
          .catch((error) => {
            console.error("Error al actualizar estación:", error);
          });
      } else {
        if (formData.foto) {
          formDataToSubmit.append("foto", formData.foto);
        }

        EstacionService.crearEstacion(formDataToSubmit)
          .then(() => {
            fetchEstaciones();
            handleCloseModal();
            setConfirmModalOpen(false);
          })
          .catch((error) => {
            console.error("Error al crear estación:", error);
          });
      }
    });
    setConfirmModalOpen(true);
  };

  const handleRowClick = (id) => {
    const currentIndex = expandedRows.indexOf(id);
    const newExpandedRows = [...expandedRows];
    if (currentIndex === -1) {
      newExpandedRows.push(id);
    } else {
      newExpandedRows.splice(currentIndex, 1);
    }
    setExpandedRows(newExpandedRows);
  };

  const isRowExpanded = (id) => {
    return expandedRows.indexOf(id) !== -1;
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedEstaciones = estaciones.sort((a, b) => {
    if (orderBy === "fecha_construccion") {
      return order === "asc"
        ? new Date(a[orderBy]) - new Date(b[orderBy])
        : new Date(b[orderBy]) - new Date(a[orderBy]);
    }
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
      <Paper className="overflow-hidden m-4 mt-1">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleCreateEstacion}
          sx={{ margin: 2 }}
        >
          Crear Estación
        </Button>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell />

                <TableCell sortDirection={orderBy === "id" ? order : false}>
                  <TableSortLabel
                    active={orderBy === "id"}
                    direction={orderBy === "id" ? order : "asc"}
                    onClick={() => handleRequestSort("id")}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>

                <TableCell sortDirection={orderBy === "nombre" ? order : false}>
                  <TableSortLabel
                    active={orderBy === "nombre"}
                    direction={orderBy === "nombre" ? order : "asc"}
                    onClick={() => handleRequestSort("nombre")}
                  >
                    Nombre
                  </TableSortLabel>
                </TableCell>

                <TableCell
                  sortDirection={orderBy === "npuntoscarga" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "npuntoscarga"}
                    direction={orderBy === "npuntoscarga" ? order : "asc"}
                    onClick={() => handleRequestSort("npuntoscarga")}
                  >
                    Puntos de carga
                  </TableSortLabel>
                </TableCell>

                {!isMobileView && (
                  <>
                    <TableCell>Fecha Construcción</TableCell>
                    <TableCell>Latitud</TableCell>
                    <TableCell>Longitud</TableCell>
                    <TableCell>Foto</TableCell>
                    <TableCell>Acciones</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedEstaciones
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((estacion) => (
                  <React.Fragment key={estacion.id}>
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell padding="checkbox">
                        {isMobileView && (
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => handleRowClick(estacion.id)}
                          >
                            {isRowExpanded(estacion.id) ? (
                              <KeyboardArrowUp />
                            ) : (
                              <KeyboardArrowDown />
                            )}
                          </IconButton>
                        )}
                      </TableCell>
                      <TableCell>{estacion.id}</TableCell>
                      <TableCell>{estacion.nombre}</TableCell>
                      <TableCell>{estacion.npuntoscarga}</TableCell>

                      {!isMobileView && (
                        <>
                          <TableCell>
                            {new Date(
                              estacion.fecha_construccion
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{estacion.latitud}</TableCell>
                          <TableCell>{estacion.longitud}</TableCell>

                          <TableCell>
                            {estacion.foto && (
                              <img
                                src={`data:image/jpeg;base64,${estacion.foto}`}
                                alt="Foto de perfil"
                                style={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                              />
                            )}

                            {!estacion.foto && (
                              <img
                                src={Cargador}
                                alt="Foto de perfil"
                                style={{
                                  width: 40,
                                  height: 40,
                                  objectFit: "cover",
                                }}
                              />
                            )}
                          </TableCell>

                          <TableCell>
                            <IconButton
                              color="primary"
                              aria-label="edit"
                              onClick={() => handleEditEstacion(estacion)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              aria-label="delete"
                              onClick={() => handleDeleteEstacion(estacion.id)}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                    {isMobileView && isRowExpanded(estacion.id) && (
                      <TableRow>
                        <TableCell colSpan={6}>
                          <Collapse
                            in={isRowExpanded(estacion.id)}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box margin={1}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                              >
                                Detalles de estación
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                <strong>Nombre:</strong> {estacion.nombre}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                <strong>Latitud:</strong> {estacion.latitud}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                <strong>Longitud:</strong> {estacion.longitud}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                <strong>Fecha de Construcción:</strong>{" "}
                                {new Date(
                                  estacion.fecha_construccion
                                ).toLocaleDateString()}
                              </Typography>
                              <Typography variant="body1" gutterBottom>
                                <strong>Nº de Puntos de Carga:</strong>{" "}
                                {estacion.npuntoscarga}
                              </Typography>
                              {estacion.foto && (
                                <img
                                  src={`data:image/jpeg;base64,${estacion.foto}`}
                                  alt={estacion.nombre}
                                  className="h-[70px] w-[70px] rounded-full object-cover"
                                />
                              )}

                              {!estacion.foto && (
                                <img
                                  src={Cargador}
                                  alt="Foto de perfil"
                                  style={{
                                    width: 40,
                                    height: 40,
                                    objectFit: "cover",
                                  }}
                                />
                              )}

                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Edit />}
                                onClick={() => handleEditEstacion(estacion)}
                                sx={{ margin: 1 }}
                              >
                                Editar
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<Delete />}
                                onClick={() =>
                                  handleDeleteEstacion(estacion.id)
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
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={estaciones.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="flex flex-col items-center  "
        />
        <Modal
          className="flex flex-col items-center justify-center"
          open={isEditModalOpen || isCreateModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box className="shadow-lg outline-0 absolute bg-white p-8 w-5/6 md:w-1/2 h-5/6 max-h-[700px] rounded-xl overflow-auto">
            <Typography id="modal-title" variant="h6" component="h2">
              {selectedEstacion ? "Editar Estación" : "Crear Estación"}
            </Typography>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <TextField
                fullWidth
                margin="normal"
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required={!selectedEstacion}
                error={!!errors.nombre}
                helperText={errors.nombre}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Latitud"
                name="latitud"
                value={formData.latitud}
                onChange={handleChange}
                required={!selectedEstacion}
                error={!!errors.latitud}
                helperText={errors.latitud}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Longitud"
                name="longitud"
                value={formData.longitud}
                onChange={handleChange}
                required={!selectedEstacion}
                error={!!errors.longitud}
                helperText={errors.longitud}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Fecha de Construcción"
                name="fecha_construccion"
                type="date"
                value={formData.fecha_construccion}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required={!selectedEstacion}
                error={!!errors.fecha_construccion}
                helperText={errors.fecha_construccion}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Nº de Puntos de Carga"
                name="npuntoscarga"
                type="number"
                value={formData.npuntoscarga}
                onChange={handleChange}
                required={!selectedEstacion}
                error={!!errors.npuntoscarga}
                helperText={errors.npuntoscarga}
              />

              {(!selectedEstacion ||
                selectedEstacion.fotoURL ||
                selectedEstacion) && (
                <>
                  <input
                    accept="image/*"
                    id="foto-upload"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="foto-upload">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      {formData.fotoURL ? "Cambiar Foto" : "Subir Foto"}
                    </Button>
                  </label>
                  {formData.fotoURL && (
                    <div style={{ textAlign: "center", marginTop: 10 }}>
                      <img
                        src={formData.fotoURL}
                        alt="Vista previa de la foto"
                        style={{ width: 100, height: 100, borderRadius: "50%" }}
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDeleteFoto}
                        fullWidth
                        sx={{ marginTop: 2 }}
                      >
                        Eliminar Foto
                      </Button>
                    </div>
                  )}
                </>
              )}

              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button onClick={handleCloseModal} sx={{ mr: 1 }}>
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  {selectedEstacion ? "Guardar Cambios" : "Crear"}
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

export default TablaEstaciones;
