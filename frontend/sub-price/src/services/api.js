import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;
const token = process.env.REACT_APP_API_TOKEN;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export const getData = async () => {
  try {
    const response = await api.get('/crm/v3/objects/contacts');
    return response.data.results; 
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
};

export default api;