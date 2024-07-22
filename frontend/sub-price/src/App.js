import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/productList';
import ProductForm from './components/productForm';

const App = () => {
    const [refresh, setRefresh] = useState(false);

    const handleSave = () => {
        setRefresh(!refresh); // Força a atualização da lista de produtos
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductList refresh={refresh} />} />
                <Route path="/product/new" element={<ProductForm onSave={handleSave} />} />
                <Route path="/product/:id" element={<ProductForm onSave={handleSave} />} />
            </Routes>
        </Router>
    );
};

export default App;