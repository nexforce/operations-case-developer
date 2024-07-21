import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, TablePagination, Button, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import axios from 'axios';

const ProductList = ({ onEdit }) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchId, setSearchId] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/products');
                const validProducts = response.data.filter(product => 
                    product.id && product.nome && product.preco && product.estoque
                );

                setProducts(validProducts);
            } catch (error) {
                console.error('Erro ao carregar produtos:', error);
            }
        };

        fetchProducts();
    }, []);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredProducts = products.filter(product => product.id.toString().includes(searchId));

    return (
        <Paper style={{ padding: 20 }}>
            <TextField
                label="Buscar por ID"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <IconButton>
                            <Search />
                        </IconButton>
                    ),
                }}
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Preço</TableCell>
                            <TableCell>Quantidade em Estoque</TableCell>
                            <TableCell>Imagem</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.nome}</TableCell>
                                <TableCell>{product.preco}</TableCell>
                                <TableCell>{product.estoque}</TableCell>
                                <TableCell>
                                    {product.image && <img src={`http://localhost:4000/uploads/${product.image}`} alt={product.nome} style={{ maxWidth: 100 }} />}
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => onEdit(product)}>Editar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredProducts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </Paper>
    );
};

export default ProductList;