import api from './api'

export const getProducts = async () => {
    try {
        const response = await api.get('/hardware/');
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export const postProducts = async (data) => {
    try {
        const response = await api.post('/hardware/create-object/', data);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export const updateProducts = async (data, id) => {
    try {
        const response = await api.patch(`/hardware/update-object/${id}`, data);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export const deleteProducts = async (id) => {
    try {
        const response = await api.delete(`/hardware/${id}`);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export const getCategories = async () => {
    try {
        const response = await api.get('/hardware/all-categories/');
        return response.data;
    } catch (err) {
        console.error(err);
    }
}