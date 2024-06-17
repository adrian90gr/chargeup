import React, { useState, useEffect } from 'react';
import EstacionService from '../../services/EstacionService';
import Cookies from 'js-cookie';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Cargador from '../../assets/cargador.png';

const CardEstacionComponent = () => {
  const [estacion, setEstacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstacion = async () => {
      try {
        const id = Cookies.get('estacionId');
        if (id) {
          const response = await EstacionService.getEstacionById(id);
          setEstacion(response.data);
        } else {
          setError('No hay ningún ID de estación guardado en las cookies');
        }
      } catch (error) {
        setError('Error al obtener la información de la estación');
      } finally {
        setLoading(false);
      }
    };

    

    fetchEstacion();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!estacion) return null;

  return (
    <div className="flex items-center flex-col md:flex-row w-5/6 md:w-3/5 mx-auto my-4 p-5 md:p-4 shadow-lg rounded-lg bg-slate-700 text-white">
      {estacion.foto && (
        <div className="  md:w-1/2 flex-shrink-0">
          <CardMedia
            component="img"
            image={`data:image/jpeg;base64,${estacion.foto}`}
            alt={estacion.nombre}
            className="object-cover rounded-lg mb-2 md:mb-0 "
            sx={{ height: '100%' }}
           
          />
        </div>
      )}

      {!estacion.foto && (
        <div className="w-full md:w-1/2 flex-shrink-0">
          <CardMedia
            component="img"
            image={Cargador}
            alt={estacion.nombre}
            className="object-cover rounded-lg mb-2 md:mb-0"
            sx={{ height: '100%' }}
           
          />
        </div>
      )}
      <CardContent className="w-full md:w-1/2 p-4 flex flex-col items-start justify-between">
        <Typography variant="h5" component="div" className="font-bold text-white self-center">
          {estacion.nombre}
        </Typography>
        <Box className=" w-full flex justify-between items-center mt-4">
          <Typography variant="subtitle1" className="font-semibold text-white">
            Número de estación:
          </Typography>
          <Typography variant="body2" color="textSecondary" >
            <span className='text-white'>{estacion.id}</span>
          </Typography>
        </Box>
        <Box className="mb-2 w-full flex justify-between items-center">
          <Typography variant="subtitle1" className="font-semibold text-white">
          <span className='text-white'></span> Número de puntos de carga:
          </Typography>
          <Typography variant="body2" color="textSecondary" >
          <span className='text-white'>{estacion.npuntoscarga}</span>
          </Typography>
        </Box>
        <Box className="mb-2 w-full flex justify-between items-center">
          <Typography variant="subtitle1" className="font-semibold text-white">
            Latitud:
          </Typography>
          <Typography variant="body2" color="textSecondary" >
          <span className='text-white'>{estacion.latitud}</span>
          </Typography>
        </Box>
        <Box className="w-full flex justify-between items-center">
          <Typography variant="subtitle1" className="font-semibold text-white">
            Longitud:
          </Typography>
          <Typography variant="body2" color="textSecondary" >
          <span className='text-white'>{estacion.longitud}</span>
          </Typography>
        </Box>
      </CardContent>
    </div>
  );
};

export default CardEstacionComponent;
