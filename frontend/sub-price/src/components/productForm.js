import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import axios from 'axios';

const ProductForm = ({ product, onSave }) => {
    const [nome, setNome] = useState(product ? product.nome : '');
    const [preco, setPreco] = useState(product ? product.preco : '');
    const [estoque, setEstoque] = useState(product ? product.estoque : '');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('preco', preco);
        formData.append('estoque', estoque);
        if (image) formData.append('image', image);

        try {
            if (product) {
                await axios.put(`http://localhost:4000/products/${product.id}`, formData);
            } else {
                await axios.post('http://localhost:4000/products', formData);
            }
            onSave();
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
        }
    };

    return (
        <Paper style={{ padding: 20 }}>
            <Typography variant="h6">{product ? 'Editar Produto' : 'Adicionar Novo Produto'}</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nome"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <TextField
                    label="Preço"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                />
                <TextField
                    label="Quantidade em Estoque"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={estoque}
                    onChange={(e) => setEstoque(e.target.value)}
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    style={{ marginTop: 10 }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 20 }}
                >
                    {product ? 'Salvar Alterações' : 'Adicionar Produto'}
                </Button>
            </form>
        </Paper>
    );
};

export default ProductForm;