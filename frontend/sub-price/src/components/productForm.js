import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = ({ onSave }) => {
    const [formState, setFormState] = useState({
        nome: '',
        preco: '',
        estoque: '',
        image: null
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`http://localhost:4000/products/${id}`);
                    setFormState({
                        nome: response.data.nome,
                        preco: response.data.preco,
                        estoque: response.data.estoque,
                        image: response.data.image
                    });
                } catch (error) {
                    console.error('Erro ao carregar produto:', error);
                }
            };
            fetchProduct();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setFormState((prevState) => ({
            ...prevState,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nome', formState.nome);
        formData.append('preco', formState.preco);
        formData.append('estoque', formState.estoque);
        if (formState.image) {
            formData.append('image', formState.image);
        }

        try {
            if (id) {
                await axios.put(`http://localhost:4000/products/${id}`, formData);
            } else {
                await axios.post('http://localhost:4000/products', formData);
            }
            onSave();
            navigate('/');
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <Paper style={{ padding: 20 }}>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nome"
                    name="nome"
                    value={formState.nome}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Preço"
                    name="preco"
                    value={formState.preco}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Quantidade em Estoque"
                    name="estoque"
                    value={formState.estoque}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ margin: '20px 0' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" color="primary" type="submit">Salvar</Button>
                    <Button variant="contained" color="secondary" onClick={handleCancel}>Cancelar</Button>
                </div>
            </form>
        </Paper>
    );
};

export default ProductForm;