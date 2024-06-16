import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import VehiculoService from "../../services/VehiculoService";
import ConfirmModalComponent from "./ConfirmModalComponent";

const categorias = ["Turismo", "Suv", "Mixto", "Otro"];
const matriculaRegex = /^[0-9]{4}[A-Z]{3}$|^[A-Z]{1,2}[0-9]{4}[A-Z]{1,2}$/;

const EditVehiculoModalComponent = ({
  open,
  onClose,
  vehiculo,
  onVehiculoUpdate,
}) => {
  const [updatedVehiculo, setUpdatedVehiculo] = useState({ ...vehiculo });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    setUpdatedVehiculo({ ...vehiculo });
  }, [vehiculo]);

  const validateAnio = (anio) => {
    const currentYear = new Date().getFullYear();
    return /^\d{4}$/.test(anio) && anio <= currentYear;
  };

  const validateForm = () => {
    const newErrores = {};
    if (!updatedVehiculo.marca) newErrores.marca = "La marca es requerida.";
    if (!updatedVehiculo.modelo) newErrores.modelo = "El modelo es requerido.";
    if (!updatedVehiculo.anio) {
      newErrores.anio = "El año es requerido.";
    } else if (!validateAnio(updatedVehiculo.anio)) {
      newErrores.anio = `Año no válido. No puede ser superior al año actual.`;
    }

    if (!updatedVehiculo.categoria)
      newErrores.categoria = "La categoría es requerida.";
    setErrores(newErrores);
    return Object.keys(newErrores).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVehiculo({
      ...updatedVehiculo,
      [name]: value,
    });
  };

  const handleOpenConfirm = () => {
    if (validateForm()) {
      setConfirmOpen(true);
    }
  };

  const handleCloseConfirm = () => {
    setConfirmOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    VehiculoService.actualizarVehiculo(
      updatedVehiculo.matricula,
      updatedVehiculo
    )
      .then(() => {
        onVehiculoUpdate();
        handleCloseConfirm();
        onClose();
      })
      .catch((error) => {
        console.error("Error updating vehicle:", error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Vehículo</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            margin="dense"
            name="matricula"
            label="Matrícula"
            type="text"
            fullWidth
            value={updatedVehiculo.matricula}
            onChange={handleChange}
            disabled
            inputProps={{ 'aria-label': 'Matrícula' }}
          />
          <TextField
            margin="dense"
            name="marca"
            label="Marca"
            type="text"
            fullWidth
            value={updatedVehiculo.marca}
            onChange={handleChange}
            error={!!errores.marca}
            helperText={errores.marca}
            inputProps={{ 'aria-label': 'Marca' }}
          />
          <TextField
            margin="dense"
            name="modelo"
            label="Modelo"
            type="text"
            fullWidth
            value={updatedVehiculo.modelo}
            onChange={handleChange}
            error={!!errores.modelo}
            helperText={errores.modelo}
            inputProps={{ 'aria-label': 'Modelo' }}
          />
          <TextField
            margin="dense"
            name="anio"
            label="Año"
            type="number"
            fullWidth
            value={updatedVehiculo.anio}
            onChange={handleChange}
            error={!!errores.anio}
            helperText={errores.anio}
            inputProps={{ 'aria-label': 'Año' }}
          />
          <TextField
            margin="dense"
            name="categoria"
            label="Categoría"
            select
            fullWidth
            value={updatedVehiculo.categoria}
            onChange={handleChange}
            error={!!errores.categoria}
            helperText={errores.categoria}
            inputProps={{ 'aria-label': 'Categoría' }}
          >
            {categorias.map((categoria) => (
              <MenuItem key={categoria} value={categoria}>
                {categoria}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleOpenConfirm} color="primary">
          Guardar
        </Button>
      </DialogActions>
      <ConfirmModalComponent
        open={confirmOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleSubmit}
        title="Confirmar Actualización"
        content="¿Estás seguro de que deseas actualizar este vehículo?"
      />
    </Dialog>
  );
};

export default EditVehiculoModalComponent;
