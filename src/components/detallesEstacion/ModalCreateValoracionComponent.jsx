import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Rating from 'react-rating-stars-component';
import ValoracionService from '../../services/ValoracionService';
import UsuarioService from '../../services/UsuarioService';
import Cookies from 'js-cookie';

const ModalCreateValoracion = ({ open, handleClose, handleSave }) => {
  const [puntuacion, setPuntuacion] = useState(0);
  const [comentario, setComentario] = useState('');
  const [usuarioId, setUsuarioId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      UsuarioService.getUsuarioActual()
        .then(response => {
          setUsuarioId(response.data.id);
        })
        .catch(error => {
          console.error('Error obteniendo el usuario actual:', error);
        });
    }
  }, [open]);

  const handleSubmit = () => {
    if (puntuacion === 0) {
      setError('La puntuación es obligatoria');
      return;
    }

    const estacionId = Cookies.get('estacionId');
    const fecha = new Date().toISOString();

    const nuevaValoracion = {
      puntuacion,
      comentario,
      usuario: usuarioId,
      estacion: estacionId,
      fecha,
    };

    ValoracionService.createValoracion(nuevaValoracion)
      .then(response => {
        handleSave(response.data);
        handleClose();
      })
      .catch(error => {
        console.error('Error creando la valoración:', error);
      });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ p: 4, borderRadius:"10px", bgcolor: 'background.paper', boxShadow: 24, width: '60%', margin: 'auto', mt: '10%' }}>
        <Typography variant="h6" mb={2}>Crear Valoración</Typography>
        <Rating value={puntuacion} onChange={newValue => setPuntuacion(newValue)} />
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Comentario"
          fullWidth
          multiline
          rows={6}
          value={comentario}
          onChange={e => setComentario(e.target.value)}
          margin="normal"
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Enviar</Button>
          <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalCreateValoracion;
