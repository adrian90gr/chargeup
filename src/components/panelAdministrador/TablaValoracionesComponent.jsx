import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton, Modal, Box, TextField, Button, Collapse, Typography, Select, MenuItem, TableSortLabel } from '@mui/material';
import { Edit, Delete, Add, Close, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import ValoracionService from '../../services/ValoracionService';
import EstacionService from '../../services/EstacionService';
import UsuarioService from '../../services/UsuarioService';
import ConfirmModalComponent from './ConfirmModalComponent';
import { BreadCrumbsComponent } from '../general/BreadCrumbsComponent';


const TablaValoraciones = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [valoraciones, setValoraciones] = useState([]);
  const [estaciones, setEstaciones] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedValoracion, setSelectedValoracion] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [formData, setFormData] = useState({
    puntuacion: "",
    comentario: "",
    usuario: "",
    estacion: "",
  });
  const [errors, setErrors] = useState({
    puntuacion: "",
    comentario: "",
    usuario: "",
    estacion: "",
  });
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");

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

  const fetchValoraciones = () => {
    ValoracionService.getValoraciones()
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setValoraciones(response.data);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching valoraciones:", error);
      });
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

  const fetchUsuarios = () => {
    UsuarioService.getAllUsuarios()
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setUsuarios(response.data);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching usuarios:", error);
      });
  };

  useEffect(() => {
    fetchValoraciones();
    fetchEstaciones();
    fetchUsuarios();
  }, []);

  const handleDeleteValoracion = (id) => {
    setConfirmAction(() => () => {
      ValoracionService.deleteValoracion(id)
        .then(() => {
          fetchValoraciones();
          setConfirmModalOpen(false);
        })
        .catch((error) => {
          console.error("Error al borrar valoracion:", error);
        });
    });
    setConfirmModalOpen(true);
  };

  const handleEditValoracion = (valoracion) => {
    setSelectedValoracion(valoracion);
    setFormData({
      puntuacion: valoracion.puntuacion,
      comentario: valoracion.comentario,
      usuario: valoracion.usuario,
      estacion: valoracion.estacion,
    });

    setErrors({
      puntuacion: "",
      comentario: "",
      usuario: "",
      estacion: "",
    });
    setEditModalOpen(true);
  };

  const handleCreateValoracion = () => {
    setSelectedValoracion(null);
    setFormData({
      puntuacion: "",
      comentario: "",
      usuario: "",
      estacion: "",
    });

    setErrors({
      puntuacion: "",
      comentario: "",
      usuario: "",
      estacion: "",
    });
    setCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setCreateModalOpen(false);
    setSelectedValoracion(null);
    setFormData({
      puntuacion: "",
      comentario: "",
      usuario: "",
      estacion: "",
    });
    setErrors({
      puntuacion: "",
      comentario: "",
      usuario: "",
      estacion: "",
    });
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValidPuntuacion =
      formData.puntuacion >= 1 && formData.puntuacion <= 5;

    if (!isValidPuntuacion) {
      setErrors({
        ...errors,
        puntuacion: "La puntuación debe ser un número del 1 al 5",
      });
      return;
    }

    if (!formData.usuario || !formData.estacion) {
      setErrors({
        ...errors,
        usuario: !formData.usuario ? "Este campo es obligatorio" : "",
        estacion: !formData.estacion ? "Este campo es obligatorio" : "",
      });
      return;
    }

    const updatedData = {
      ...formData,
      fecha: new Date().toISOString(),
    };

    if (selectedValoracion) {
      setConfirmAction(() => () => {
        ValoracionService.actualizarValoracion(
          selectedValoracion.id,
          updatedData
        )
          .then(() => {
            fetchValoraciones();
            handleCloseModal();
            setConfirmModalOpen(false);
          })
          .catch((error) => {
            console.error("Error al actualizar valoración:", error);
          });
      });
      setConfirmModalOpen(true);
    } else {
      setConfirmAction(() => () => {
        ValoracionService.createValoracion(updatedData)
          .then(() => {
            fetchValoraciones();
            handleCloseModal();
          })
          .catch((error) => {
            console.error("Error al crear valoracion:", error);
          });
        setConfirmModalOpen(false);
      });
      setConfirmModalOpen(true);
    }
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

  const sortedValoraciones = valoraciones.sort((a, b) => {
    if (orderBy === "fecha") {
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
      <Paper className="overflow-hidden m-1 ">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleCreateValoracion}
          sx={{ margin: 2 }}
        >
          Crear Valoración
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
                    ID Valoracion
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sortDirection={orderBy === "puntuacion" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "puntuacion"}
                    direction={orderBy === "puntuacion" ? order : "asc"}
                    onClick={() => handleRequestSort("puntuacion")}
                  >
                    Puntuación
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sortDirection={orderBy === "usuario" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "usuario"}
                    direction={orderBy === "usuario" ? order : "asc"}
                    onClick={() => handleRequestSort("usuario")}
                  >
                    ID Usuario
                  </TableSortLabel>
                </TableCell>

                {!isMobileView && (
                  <>
                    <TableCell>ID Estacion</TableCell>
                    <TableCell
                      sortDirection={orderBy === "fecha" ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === "fecha"}
                        direction={orderBy === "fecha" ? order : "asc"}
                        onClick={() => handleRequestSort("fecha")}
                      >
                        Fecha
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Comentario</TableCell>
                    <TableCell>Acciones</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
  {sortedValoraciones
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((valoracion) => (
      <React.Fragment key={valoracion.id}>
        <TableRow hover role="checkbox" tabIndex={-1}>
          <TableCell>
            {isMobileView && (
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => handleRowClick(valoracion.id)}
              >
                {isRowExpanded(valoracion.id) ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            )}
          </TableCell>
          <TableCell>{valoracion.id}</TableCell>
          <TableCell>{valoracion.puntuacion}</TableCell>
          <TableCell>{valoracion.usuario}</TableCell>
          {!isMobileView && (
            <>
              <TableCell>{valoracion.estacion}</TableCell>
              <TableCell>{new Date(valoracion.fecha).toLocaleDateString()}</TableCell>
              <TableCell>{valoracion.comentario}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="edit"
                  size="small"
                  color="primary"
                  onClick={() => handleEditValoracion(valoracion)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="secondary"
                  onClick={() => handleDeleteValoracion(valoracion.id)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </>
          )}
        </TableRow>
        {isMobileView && (
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={isRowExpanded(valoracion.id)} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Typography variant="h6" gutterBottom component="div">
                    Detalles de valoración
                  </Typography>
                  <Typography>
                    <strong>ID:</strong> {valoracion.id}
                  </Typography>
                  <Typography>
                    <strong>Puntuacion:</strong> {valoracion.puntuacion}
                  </Typography>
                  <Typography>
                    <strong>ID Usuario:</strong> {valoracion.usuario}
                  </Typography>
                  <Typography>
                    <strong>ID Estación:</strong> {valoracion.estacion}
                  </Typography>
                  <Typography>
                    <strong>Fecha:</strong> {new Date(valoracion.fecha).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    <strong>Comentarios:</strong> {valoracion.comentario}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Edit />}
                    onClick={() => handleEditValoracion(valoracion)}
                    sx={{ margin: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Delete />}
                    onClick={() => handleDeleteValoracion(valoracion.id)}
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
          className="flex flex-col items-center"
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={valoraciones.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Modal
          className="flex flex-col items-center justify-center"
          open={isEditModalOpen || isCreateModalOpen}
          onClose={handleCloseModal}
        >
          <Box className="shadow-lg outline-0 absolute bg-white p-8 w-5/6 md:w-1/2 h-4/6 max-h-[700px] rounded-xl overflow-auto">
            <Typography variant="h6" component="h2">
              {selectedValoracion ? "Editar Valoración" : "Crear Valoración"}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Puntuación"
                name="puntuacion"
                type="number"
                value={formData.puntuacion}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={!!errors.puntuacion}
                helperText={errors.puntuacion}
                inputProps={{ min: 1, max: 5 }}
              />
              <TextField
                label="Comentario"
                name="comentario"
                value={formData.comentario}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={!!errors.comentario}
                helperText={errors.comentario}
              />
              <TextField
                select
                label="ID Usuario"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                error={!!errors.usuario}
                helperText={errors.usuario}
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
                select
                label="ID Estación"
                name="estacion"
                value={formData.estacion}
                onChange={handleChange}
                error={!!errors.estacion}
                helperText={errors.estacion}
                fullWidth
                margin="normal"
              >
                {estaciones.map((estacion) => (
                  <MenuItem key={estacion.id} value={estacion.id}>
                    {estacion.id}
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
                  {selectedValoracion ? "Guardar" : "Crear"}
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

export default TablaValoraciones;
