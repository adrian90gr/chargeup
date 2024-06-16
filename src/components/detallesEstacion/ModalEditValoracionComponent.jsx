import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Rating from 'react-rating-stars-component';
import ValoracionService from '../../services/ValoracionService';

const ModalEditValoracion = ({ open, handleClose, valoracion, handleSave }) => {
  const [puntuacion, setPuntuacion] = useState(valoracion.puntuacion);
  const [comentario, setComentario] = useState(valoracion.comentario);
  const [error, setError] = useState('');

  useEffect(() => {
    setPuntuacion(valoracion.puntuacion);
    setComentario(valoracion.comentario);
  }, [valoracion]);

  const handleSubmit = () => {
    if (puntuacion === 0) {
      setError('La puntuación es obligatoria');
      return;
    }

    const updatedValoracion = {
      ...valoracion,
      puntuacion,
      comentario,
      usuario: valoracion.usuario.id,
      estacion: valoracion.estacion,
      fecha: new Date().toISOString(), // Actualizar la fecha a la fecha actual
    };

    ValoracionService.actualizarValoracion(valoracion.id, updatedValoracion)
      .then(() => {
        handleSave(updatedValoracion);
        handleClose();
      })
      .catch(error => {
        console.error('Error actualizando la valoración:', error);
      });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ p: 4,borderRadius:"10px", bgcolor: 'background.paper', boxShadow: 24, width: '60%', margin: 'auto', mt: '10%' }}>
        <Typography variant="h6" mb={2}>Editar Valoración</Typography>
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
          <Button variant="contained" color="primary" onClick={handleSubmit}>Guardar</Button>
          <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalEditValoracion;
