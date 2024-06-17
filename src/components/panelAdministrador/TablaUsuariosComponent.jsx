import React, { useState, useEffect } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton, Modal, Box, TextField, Button,FormControlLabel, Checkbox, Collapse, Typography,TableSortLabel} from '@mui/material';
import { Edit, Delete, Add, Close, Visibility, VisibilityOff, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import UsuarioService from '../../services/UsuarioService';
import RegisterService from '../../services/RegisterService';
import ConfirmModalComponent from './ConfirmModalComponent';
import { BreadCrumbsComponent } from '../general/BreadCrumbsComponent';
import FotoUsuario from "../../assets/IconoPerfilUsuario.svg";

const TablaUsuarios = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    telefono: "",
    admin: false,
    contraseña: "",
    foto: null,
    fotoURL: "",
    eliminarFoto: false,
  });
  const [errors, setErrors] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    telefono: "",
    contraseña: "",
  });

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
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
    fetchUsuarios();
  }, []);

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleDeleteUsuario = (id) => {
    setConfirmAction(() => () => {
      UsuarioService.deleteUsuario(id)
        .then(() => {
          fetchUsuarios();
          setConfirmModalOpen(false); // Close the confirmation modal
        })
        .catch((error) => {
          console.error("Error deleting usuario:", error);
        });
    });
    setConfirmModalOpen(true);
  };

  const handleEditUsuario = (user) => {
    setSelectedUser(user);
    setFormData({
      nombre: user.nombre,
      apellidos: user.apellidos,
      correo: user.correo,
      telefono: user.telefono,
      admin: user.admin,
      contraseña: "",
      foto: null,
      fotoURL: user.foto ? `data:image/jpeg;base64,${user.foto}` : "",
      eliminarFoto: false,
    });

    setErrors({
      nombre: "",
      apellidos: "",
      correo: "",
      telefono: "",
      contraseña: "",
    });
    setEditModalOpen(true);
  };

  const handleCreateUsuario = () => {
    setSelectedUser(null);
    setFormData({
      nombre: "",
      apellidos: "",
      correo: "",
      telefono: "",
      admin: false,
      contraseña: "",
      foto: null,
      fotoURL: "",
      eliminarFoto: false,
    });
    setErrors({
      nombre: "",
      apellidos: "",
      correo: "",
      telefono: "",
      contraseña: "",
    });
    setCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setCreateModalOpen(false);
    setSelectedUser(null);
    setFormData({
      nombre: "",
      apellidos: "",
      correo: "",
      telefono: "",
      admin: false,
      contraseña: "",
      foto: null,
      fotoURL: "",
      eliminarFoto: false,
    });
    setErrors({
      nombre: "",
      apellidos: "",
      correo: "",
      telefono: "",
      contraseña: "",
    });
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "correo") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors({
        ...errors,
        correo: emailRegex.test(value) ? "" : "Correo no válido",
      });
    } else if (name === "telefono") {
      const phoneRegex = /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/;
      setErrors({
        ...errors,
        telefono: phoneRegex.test(value) ? "" : "Teléfono no válido",
      });
    } else if (name === "contraseña") {
      setErrors({
        ...errors,
        contraseña:
          value.length >= 6
            ? ""
            : "La contraseña debe tener al menos 6 caracteres",
      });
    }
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/;
    const isValidEmail = emailRegex.test(formData.correo);
    const isValidPhone = phoneRegex.test(formData.telefono);
    const isValidPassword = formData.contraseña.length >= 6 || selectedUser;

    if (!isValidEmail || !isValidPhone || !isValidPassword) {
      setErrors({
        ...errors,
        correo: isValidEmail ? "" : "Correo no válido",
        telefono: isValidPhone ? "" : "Teléfono no válido",
        contraseña: isValidPassword
          ? ""
          : "La contraseña debe tener al menos 6 caracteres",
      });
      return;
    }

    const updatedData = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== "" && formData[key] !== null) {
        updatedData[key] = formData[key];
      }
    });

    const submitAction = selectedUser
      ? () => {
          const userData = new FormData();
          Object.keys(updatedData).forEach((key) => {
            userData.append(key, updatedData[key]);
          });
          if (formData.eliminarFoto) {
            userData.append("eliminarFoto", true);
          }

          UsuarioService.updateUsuario(selectedUser.id, userData)
            .then(() => {
              fetchUsuarios();
              handleCloseModal();
              setConfirmModalOpen(false); // Close the confirmation modal
            })
            .catch((error) => {
              console.error("Error al actualizar usuario:", error);
            });
        }
      : () => {
          RegisterService.register(formData)
            .then(() => {
              fetchUsuarios();
              handleCloseModal();
              setConfirmModalOpen(false); // Close the confirmation modal
            })
            .catch((error) => {
              console.error("Error al crear usuario:", error);
            });
        };

    setConfirmAction(() => submitAction);
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

  const sortedUsuarios = usuarios.sort((a, b) => {
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
      {" "}
      <BreadCrumbsComponent></BreadCrumbsComponent>
      <Paper className="overflow-hidden m-4 mt-1">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleCreateUsuario}
          sx={{ margin: 2 }}
        >
          Crear Usuario
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
                  sortDirection={orderBy === "apellidos" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "apellidos"}
                    direction={orderBy === "apellidos" ? order : "asc"}
                    onClick={() => handleRequestSort("apellidos")}
                  >
                    Apellidos
                  </TableSortLabel>
                </TableCell>
                {!isMobileView && (
                  <>
                    <TableCell>Correo</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>Foto</TableCell>
                    <TableCell>Acciones</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsuarios
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((usuario) => (
                  <React.Fragment key={usuario.id}>
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell>
                        {isMobileView && (
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => handleRowClick(usuario.id)}
                          >
                            {isRowExpanded(usuario.id) ? (
                              <KeyboardArrowUp />
                            ) : (
                              <KeyboardArrowDown />
                            )}
                          </IconButton>
                        )}
                      </TableCell>
                      <TableCell>{usuario.id}</TableCell>
                      <TableCell>{usuario.nombre}</TableCell>
                      <TableCell>{usuario.apellidos}</TableCell>
                      {!isMobileView && (
                        <>
                          <TableCell>{usuario.correo}</TableCell>
                          <TableCell>{usuario.telefono}</TableCell>
                          <TableCell>{usuario.admin ? "Sí" : "No"}</TableCell>
                          <TableCell>
                            {usuario.foto && (
                              <img
                                src={`data:image/jpeg;base64,${usuario.foto}`}
                                alt="Foto de perfil"
                                style={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: "50%",
                                }}
                              />
                            )}

                            {!usuario.foto && (
                              <img
                                src={FotoUsuario}
                                alt="Foto de perfil"
                                style={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: "50%",
                                }}
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              color="primary"
                              onClick={() => handleEditUsuario(usuario)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={() => handleDeleteUsuario(usuario.id)}
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
                          colSpan={9}
                        >
                          <Collapse
                            in={isRowExpanded(usuario.id)}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box margin={1}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                              >
                                Detalles del Usuario
                              </Typography>
                              <Typography>
                                <strong>ID:</strong> {usuario.id}
                              </Typography>
                              <Typography>
                                <strong>Nombre:</strong> {usuario.nombre}
                              </Typography>
                              <Typography>
                                <strong>Apellidos:</strong> {usuario.apellidos}
                              </Typography>
                              <Typography>
                                <strong>Correo:</strong> {usuario.correo}
                              </Typography>
                              <Typography>
                                <strong>Teléfono:</strong> {usuario.telefono}
                              </Typography>
                              <Typography>
                                <strong>Admin:</strong>{" "}
                                {usuario.admin ? "Sí" : "No"}
                              </Typography>
                              {usuario.foto && (
                                <Typography>
                                  <strong>Foto:</strong>{" "}
                                  <img
                                    src={`data:image/jpeg;base64,${usuario.foto}`}
                                    alt="Foto de perfil"
                                    style={{
                                      width: 100,
                                      height: 100,
                                      borderRadius: "50%",
                                    }}
                                  />
                                </Typography>
                              )}

                              {!usuario.foto && (
                                <Typography>
                                  <strong>Foto:</strong>{" "}
                                  <img
                                    src={FotoUsuario}
                                    alt="Foto de perfil"
                                    style={{
                                      width: 100,
                                      height: 100,
                                      borderRadius: "50%",
                                    }}
                                  />
                                </Typography>
                              )}

                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Edit />}
                                onClick={() => handleEditUsuario(usuario)}
                                sx={{ margin: 1 }}
                              >
                                Editar
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<Delete />}
                                onClick={() => handleDeleteUsuario(usuario.id)}
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
          count={usuarios.length}
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
        >
          <Box className="shadow-lg outline-0 absolute bg-white p-8 w-5/6 md:w-1/2 h-5/6 max-h-[700px] rounded-xl overflow-auto">
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseModal}
              aria-label="close"
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <Close />
            </IconButton>
            <Typography id="modal-title" variant="h6" component="h2">
              {selectedUser ? "Editar usuario" : "Crear usuario"}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                name="nombre"
                label="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required={!selectedUser}
                error={!!errors.nombre}
                helperText={errors.nombre}
              />
              <TextField
                name="apellidos"
                label="Apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required={!selectedUser}
                error={!!errors.apellidos}
                helperText={errors.apellidos}
              />
              <TextField
                name="correo"
                label="Correo"
                type="email"
                value={formData.correo}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required={!selectedUser}
                error={!!errors.correo}
                helperText={errors.correo}
              />
              <TextField
                name="telefono"
                label="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required={!selectedUser}
                error={!!errors.telefono}
                helperText={errors.telefono}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="admin"
                    checked={formData.admin}
                    onChange={handleChange}
                  />
                }
                label="Administrador"
              />
              <TextField
                name="contraseña"
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                value={formData.contraseña}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required={!selectedUser}
                error={!!errors.contraseña}
                helperText={errors.contraseña}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleToggleShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
              {(!selectedUser || selectedUser || formData.fotoURL) && (
                <>
                  <input
                    accept="image/*"
                    id="foto-upload"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
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
                  <label htmlFor="foto-upload">
                    <Button
                      sx={{ marginTop: 2 }}
                      variant="contained"
                      color="primary"
                      component="span"
                      fullWidth
                    >
                      {formData.fotoURL ? "Cambiar Foto" : "Subir Foto"}
                    </Button>
                  </label>
                </>
              )}
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button onClick={handleCloseModal} sx={{ mr: 1 }}>
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  {selectedUser ? "Guardar Cambios" : "Crear"}
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
export default TablaUsuarios;