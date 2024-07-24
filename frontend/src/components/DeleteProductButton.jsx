import React from 'react';
import axios from 'axios';
import { useState } from "react";

const DeleteProductButton = ({ productId }) => {
    const [showSuccess, setShowSuccess] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_API_URL}/products/${productId}`);
            setShowSuccess(true);
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <>
            <button onClick={handleDelete}>Deletar Produto</button>
            {showSuccess && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#fafafa',
                    padding: '20px',
                    borderRadius: '5px',
                    zIndex: 1000,
                }}>
                    Produto Deletado com Sucesso!
                </div>
            )}
        </>
    );

};

export default DeleteProductButton;
