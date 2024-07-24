import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useMakeRequest from '../hooks/useMakeRequest';
import styles from '../styles/ProductForm.module.css';

const UpdateProductForm = () => {
    const { slug } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        stock: '',
        description: '',
        categories: [],
        image: '',
        rating: {
            rate: '',
            count: ''
        }
    });

    const result = useMakeRequest(`${import.meta.env.VITE_BASE_API_URL}/products/${slug}`);

    useEffect(() => {
        if (result.data) {
            setFormData({
                title: result.data.title,
                price: result.data.price,
                stock: result.data.stock,
                description: result.data.description,
                categories: result.data.Categories ? result.data.Categories.map(cat => cat.name) : '',
                image: result.data.image,
                rating: {
                    rate: result.data.rating.rate,
                    count: result.data.rating.count
                }
            });
        }
    }, [result.data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('rating')) {
            const ratingKey = name.split('.')[1];
            setFormData({
                ...formData,
                rating: {
                    ...formData.rating,
                    [ratingKey]: value
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData,
            categories: formData.categories.includes(',') ? formData.categories.split(',') : [formData.categories]
        };
        try {
            const response = await axios.patch(`${import.meta.env.VITE_BASE_API_URL}/products/${slug}`, updatedFormData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                alert('Product updated successfully!');
                setTimeout(() => {
                    window.location.href = `/product/${slug}`;
                }, 2000);
            } else {
                alert('Failed to update product');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update product');
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
                <label htmlFor="title">Título</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label htmlFor="price">Preço</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label htmlFor="stock">Estoque</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label htmlFor="description">Descrição</label>
                <textarea name="description" value={formData.description} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label htmlFor="categories">Categorias(Separado por vírgula (,))</label>
                <input type="text" name="categories" value={formData.categories} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label htmlFor="image">Image URL (.png, .jpg, .jpeg)</label>
                <input type="url" name="image" value={formData.image} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label htmlFor="rating.rate">Classificação (Avaliação, 0-5 estrelas)</label>
                <input type="number" step="0.1" name="rating.rate" value={formData.rating.rate} onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label htmlFor="rating.count">Classificação (Quantidade)</label>
                <input type="number" name="rating.count" value={formData.rating.count} onChange={handleChange} />
            </div>
            <button className={styles.btn} type="submit">Atualizar Produto</button>
        </form>
    );
};

export default UpdateProductForm;
