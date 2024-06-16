import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Avatar,
  IconButton,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import UsuarioService from "../../services/UsuarioService";

const EditUserModalComponent = ({ user, open, onClose, onUserUpdate }) => {
  const [nombre, setNombre] = useState(user.nombre);
  const [apellidos, setApellidos] = useState(user.apellidos);
  const [correo, setCorreo] = useState(user.correo);
  const [telefono, setTelefono] = useState(user.telefono);
  const [foto, setFoto] = useState(user.foto ? `data:image/jpeg;base64,${user.foto}` : "");
  const [fotoFile, setFotoFile] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleFotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFotoFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => setFoto(e.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDeleteFoto = () => {
    setFoto("");
    setFotoFile(null);
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    if (password && password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if (password && password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const updatedUser = new FormData();
    updatedUser.append("nombre", nombre);
    updatedUser.append("apellidos", apellidos);
    updatedUser.append("correo", correo);
    updatedUser.append("telefono", telefono);
    updatedUser.append("admin", user.admin); // Mantener el valor original de admin

    if (fotoFile) {
      updatedUser.append("foto", fotoFile);
    } else if (foto === "") {
      updatedUser.append("eliminarFoto", true);
    }

    if (password) {
      updatedUser.append("contraseña", password);
    }

    UsuarioService.updateUsuario(user.id, updatedUser)
      .then(() => {
        onUserUpdate();
        onClose();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="bg-slate-700 text-white">
        Editar Perfil
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <div className="flex flex-col items-center mb-4">
          <Avatar
            src={foto || ""}
            alt="Foto de perfil"
            sx={{ width: 100, height: 100, marginBottom: 2 }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
            className="mt-4"
            id="foto-upload"
            style={{ display: "none" }}
          />
          <label htmlFor="foto-upload">
            <Button
              sx={{ marginBottom: 2 }}
              variant="contained"
              color="primary"
              component="span"
              className="mt-2"
            >
              {foto ? "Cambiar Foto" : "Subir Foto"}
            </Button>
          </label>
          {foto && (
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteFoto}
              className=""
            >
              Borrar Foto
            </Button>
          )}
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Campo</TableCell>
                <TableCell>Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>
                  <TextField
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    fullWidth
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Apellidos</TableCell>
                <TableCell>
                  <TextField
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    fullWidth
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Correo</TableCell>
                <TableCell>
                  <TextField
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    fullWidth
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Teléfono</TableCell>
                <TableCell>
                  <TextField
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    fullWidth
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Contraseña</TableCell>
                <TableCell>
                  <TextField
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={handleToggleShowPassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Confirmar Contraseña</TableCell>
                <TableCell>
                  <TextField
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={handleToggleShowPassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModalComponent;
