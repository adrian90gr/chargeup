import axios from 'axios';

const API_URL = 'https://back-b1i4.onrender.com/api/';

const RegisterService = {
  register: async (usuario) => {//Registro
    try {
      const formData = new FormData();
      for (const key in usuario) {
        if (usuario[key] !== null && usuario[key] !== '') {
          formData.append(key, usuario[key]);
        }
      }

      const response = await axios.post(API_URL + 'registro/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(JSON.stringify(error.response.data));
      } else if (error.request) {
        throw new Error('No response received from server');
      } else {
        throw new Error('Error setting up request');
      }
    }
  },
};

export default RegisterService;
