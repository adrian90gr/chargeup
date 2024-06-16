import React, { useState, useEffect } from "react";
import {Button,Dialog,DialogActions,DialogContent,DialogTitle,TextField,IconButton,MenuItem,Typography} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import VehiculoService from "../../services/VehiculoService";
import UsuarioService from "../../services/UsuarioService";
import ConfirmModalComponent from "./ConfirmModalComponent";

const categorias = ["Turismo", "Suv", "Mixto", "Otro"];
const matriculaRegex = /^[0-9]{4}[A-Z]{3}$|^[A-Z]{1,2}[0-9]{4}[A-Z]{1,2}$/;

const CreateVehiculoModalComponent = ({ open, onClose, onVehiculoCreated }) => {
  const [vehiculo, setVehiculo] = useState({
    matricula: "",
    marca: "",
    modelo: "",
    anio: "",
    categoria: "",
    usuario: null,
  });
  const [errores, setErrores] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (open) {
      UsuarioService.getUsuarioActual()
        .then((response) => {
          setVehiculo((prevVehiculo) => ({
            ...prevVehiculo,
            usuario: response.data.id,
          }));
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [open]);

  const validateAnio = (anio) => {
    const currentYear = new Date().getFullYear();
    return /^\d{4}$/.test(anio) && anio >= 1900 && anio <= currentYear;
  };

  const validateForm = async () => {
    const newErrores = {};
    if (!vehiculo.matricula) {
      newErrores.matricula = "La matrícula es requerida.";
    } else if (!matriculaRegex.test(vehiculo.matricula)) {
      newErrores.matricula = "Matrícula no válida.";
    }
    if (!vehiculo.marca) newErrores.marca = "La marca es requerida.";
    if (!vehiculo.modelo) newErrores.modelo = "El modelo es requerido.";

    if (!vehiculo.anio) {
      newErrores.anio = "El año es requerido.";
    } else if (!validateAnio(vehiculo.anio)) {
      newErrores.anio = `Año no válido. Debe estar entre 1900 y el año actual.`;
    }

    if (!vehiculo.categoria)
      newErrores.categoria = "La categoría es requerida.";
    setErrores(newErrores);

    return Object.keys(newErrores).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehiculo({
      ...vehiculo,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!(await validateForm())) return;
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    VehiculoService.crearVehiculo(vehiculo)
      .then((response) => {
        onVehiculoCreated();
        onClose();
      })
      .catch((error) => {
        console.error("Error creating vehicle:", error);
      });
    setConfirmOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>
          Crear Vehículo
          <IconButton
            onClick={onClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="matricula"
            label="Matrícula"
            type="text"
            fullWidth
            value={vehiculo.matricula}
            onChange={handleChange}
            error={!!errores.matricula}
            helperText={errores.matricula}
          />
          <TextField
            margin="dense"
            name="marca"
            label="Marca"
            type="text"
            fullWidth
            value={vehiculo.marca}
            onChange={handleChange}
            error={!!errores.marca}
            helperText={errores.marca}
          />
          <TextField
            margin="dense"
            name="modelo"
            label="Modelo"
            type="text"
            fullWidth
            value={vehiculo.modelo}
            onChange={handleChange}
            error={!!errores.modelo}
            helperText={errores.modelo}
          />
          <TextField
            margin="dense"
            name="anio"
            label="Año"
            type="number"
            fullWidth
            value={vehiculo.anio}
            onChange={handleChange}
            error={!!errores.anio}
            helperText={errores.anio}
          />
          <TextField
            margin="dense"
            name="categoria"
            label="Categoría"
            select
            fullWidth
            value={vehiculo.categoria}
            onChange={handleChange}
            error={!!errores.categoria}
            helperText={errores.categoria}
          >
            {categorias.map((categoria) => (
              <MenuItem key={categoria} value={categoria}>
                {categoria}
              </MenuItem>
            ))}
          </TextField>
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
      <ConfirmModalComponent
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        title="Confirmar Creación"
        description="¿Estás seguro de que deseas crear este vehículo?"
      />
    </>
  );
};

export default CreateVehiculoModalComponent;
