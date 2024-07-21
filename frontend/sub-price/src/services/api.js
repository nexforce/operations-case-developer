import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const getProducts = () => {
    return axios.get(baseURL)
        .then(response => response.data)
        .catch(error => {
            console.error('Erro ao buscar produtos:', error);
            throw error;
        });
};

export const getProductById = (id) => {
    return axios.get(`${baseURL}/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Erro ao buscar produto:', error);
            throw error;
        });
};
