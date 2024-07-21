import React, { useState } from 'react';
import ProductList from './components/productList';
import ProductForm from './components/productForm';
import { Button } from '@mui/material'; 

const App = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsEditing(true);
    };

    const handleSave = () => {
        setSelectedProduct(null);
        setIsEditing(false);
    };

    return (
        <div style={{ padding: 20 }}>
            {isEditing ? (
                <ProductForm product={selectedProduct} onSave={handleSave} />
            ) : (
                <>
                    <ProductList onEdit={handleEdit} />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsEditing(true)}
                        style={{ marginTop: 20 }}
                    >
                        Adicionar Novo Produto
                    </Button>
                </>
            )}
        </div>
    );
};

export default App;