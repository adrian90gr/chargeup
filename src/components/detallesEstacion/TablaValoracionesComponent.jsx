import React, { useState, useEffect } from 'react';
import ValoracionService from '../../services/ValoracionService';
import UsuarioService from '../../services/UsuarioService';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import StarRatings from 'react-star-ratings';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import ModalEditValoracion from './ModalEditValoracionComponent';
import ModalCreateValoracion from './ModalCreateValoracionComponent';
import ConfirmModalComponent from '../panelAdministrador/ConfirmModalComponent';

const TablaValoraciones = () => {
  const [valoraciones, setValoraciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedValoracion, setSelectedValoracion] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    UsuarioService.getUsuarioActual()
      .then(usuario => {
        setUsuarioActual(usuario.data);
      })
      .catch(error => {
        console.error("Error obteniendo el usuario actual:", error);
      });
  }, []);

  useEffect(() => {
    const estacionId = Cookies.get('estacionId');
    if (estacionId) {
      ValoracionService.getValoracionesByEstacion(estacionId)
        .then(response => {
          const valoracionesConUsuarios = response.data.map(valoracion => {
            return UsuarioService.getUsuarioById(valoracion.usuario)
              .then(usuarioResponse => {
                return {
                  ...valoracion,
                  usuario: usuarioResponse.data
                };
              });
          });

          Promise.all(valoracionesConUsuarios).then(result => {
            result.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Ordenar por fecha
            setValoraciones(result);
            setLoading(false);
          });
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    } else {
      setError('No se encontró el ID de la estación');
      setLoading(false);
    }
  }, []);

  const handleEditClick = valoracion => {
    setSelectedValoracion(valoracion);
  };

  const handleSave = updatedValoracion => {
    UsuarioService.getUsuarioById(updatedValoracion.usuario)
      .then(usuarioResponse => {
        const updatedValoracionConUsuario = {
          ...updatedValoracion,
          usuario: usuarioResponse.data
        };
        setValoraciones(prevValoraciones => {
          const updatedValoraciones = prevValoraciones.map(v => 
            v.id === updatedValoracionConUsuario.id ? updatedValoracionConUsuario : v
          );
          updatedValoraciones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Ordenar por fecha
          return updatedValoraciones;
        });
        setSelectedValoracion(null);
      })
      .catch(error => {
        console.error('Error obteniendo el usuario:', error);
      });
  };

  const handleCreateSave = nuevaValoracion => {
    UsuarioService.getUsuarioById(nuevaValoracion.usuario)
      .then(usuarioResponse => {
        const nuevaValoracionConUsuario = {
          ...nuevaValoracion,
          usuario: usuarioResponse.data
        };
        setValoraciones(prevValoraciones => {
          const updatedValoraciones = [nuevaValoracionConUsuario, ...prevValoraciones];
          updatedValoraciones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Ordenar por fecha
          return updatedValoraciones;
        });
      })
      .catch(error => {
        console.error('Error obteniendo el usuario:', error);
      });
  };

  const handleCloseModal = () => {
    setSelectedValoracion(null);
  };

  const handleDeleteClick = valoracion => {
    setConfirmAction(() => () => {
      ValoracionService.deleteValoracion(valoracion.id)
        .then(() => {
          setValoraciones(prevValoraciones => prevValoraciones.filter(v => v.id !== valoracion.id));
        })
        .catch(error => {
          console.error('Error al eliminar la valoración:', error);
        });
      setConfirmModalOpen(false);
    });
    setConfirmModalOpen(true);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error.message || error}</Alert>;
  }

  return (
    <Box className='w-5/6 md:w-4/6'>
      <Button className='bg-slate-700' style={{ marginBottom: '16px' }} variant="contained" color="primary" onClick={() => setIsCreateModalOpen(true)}>
      Dejar una Valoración
      </Button>
      {valoraciones.map(valoracion => (
        <Card key={valoracion.id} style={{ marginBottom: '16px' }}>
        <CardContent className="w-full flex flex-col items-center  md:items-start">
          <Box className="flex flex-col md:flex-row gap-4 w-full items-center md:items-start">
            <Box className="avatar h-[50px] w-[50px]">
              <Avatar src={`data:image/jpeg;base64,${valoracion.usuario.foto}`} />
            </Box>
            <Box className="w-full flex flex-col items-center md:items-start">
              <Typography variant="h6">{valoracion.usuario.nombre}</Typography>
              <Box className="flex flex-col md:flex-row items-center gap-3">
                <StarRatings
                  rating={valoracion.puntuacion}
                  starRatedColor="gold"
                  numberOfStars={5}
                  name="rating"
                  starDimension="15px"
                  starSpacing="1px"
                  isSelectable={false}
                />
                <Typography variant="body2">
                  {new Date(valoracion.fecha).toLocaleDateString()}
                </Typography>
              </Box>
              <Box className="w-[80%]">
                <Typography className="break-words md:break-words">{valoracion.comentario}</Typography>
              </Box>
              {usuarioActual && String(valoracion.usuario.id) === String(usuarioActual.id) && (
                <div className="flex flex-col md:flex-row items-center justify-center mt-2 md:mt-0">
                  <Button variant="text" color="primary" onClick={() => handleEditClick(valoracion)}>
                    Editar
                  </Button>
                  <Button variant="text" color="secondary" onClick={() => handleDeleteClick(valoracion)}>
                    Eliminar
                  </Button>
                </div>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
      
      ))}
      {selectedValoracion && (
        <ModalEditValoracion
          open={Boolean(selectedValoracion)}
          handleClose={handleCloseModal}
          valoracion={selectedValoracion}
          handleSave={handleSave}
        />
      )}
      <ModalCreateValoracion
        open={isCreateModalOpen}
        handleClose={() => setIsCreateModalOpen(false)}
        handleSave={handleCreateSave}
      />
      <ConfirmModalComponent 
        open={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => {
          if (confirmAction) confirmAction();
        }}
        title="Confirmación"
        description="¿Está seguro de que desea realizar esta acción?"
      />
    </Box>
  );
};

export default TablaValoraciones;
