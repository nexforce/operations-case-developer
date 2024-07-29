import { useEffect, useState } from 'react';
import { getProducts, getCategories } from '../utils/apiService.js';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import ModalComponent from './modalComponent';
import DeleteModal from './deleteComponent';
import CategoryComponent from './categoryComponent';
import PriceComponent from './priceComponent.jsx';

const TableComponent = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const getData = async () => {
        try {
            const response = await getProducts();
            const products = response.hardware || [];
            
            if (Array.isArray(products)) {
                setData(products);
                setFilteredData(products);
            } else {
                console.error('Missing or invalid hardware data', products);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getCategoriesData = async () => {
        try {
            const response = await getCategories();
            const categories = response || [];

            if (Array.isArray(categories)) {
                setCategories(categories);
            } else {
                console.error('Missing or invalid categories data', categories);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData();
        getCategoriesData();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            setFilteredData(data.filter(product => product.category === selectedCategory));
        } else {
            setFilteredData(data);
        }
    }, [selectedCategory, data]);

    const handleModal = async (product = null) => {
        setSelectedProduct(product);
        setIsModalVisible(true);
    };

    const handleCloseModal = async () => {
        setIsModalVisible(false);
        setSelectedProduct(null);
        await getData();
    };
    
    const handleDeleteModal = (product) => {
        if (product && product._id) {
            setSelectedProduct(product);
            setIsModalDeleteVisible(true);
        } else {
            console.error('Error to delete product', product);
        }
    };

    const handleCloseDeleteModal = async () => {
        setIsModalDeleteVisible(false);
        setSelectedProduct(null);
        await getData();
    };

    const handlePriceFilter = (maxPrice) => {
        if (maxPrice) {
            setFilteredData(data.filter(product => product.price <= maxPrice));
        } else {
            setFilteredData(data);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="overflow-x-auto">
                <button
                    className="ml-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-700 transition duration-150 ease-in-out hover:bg-green-600 bg-black rounded text-white px-2 py-0.5 text-sm"
                    onClick={() => handleModal(null)}
                > +
                </button>
                <CategoryComponent
                    options={categories}
                    onSelect={setSelectedCategory}
                />
                <PriceComponent onFilter={handlePriceFilter} />
                <table className="min-w-full bg-white shadow-md rounded-xl mt-6">
                    <thead>
                        <tr className="bg-blue-gray-100 text-gray-700">
                            <th className="py-3 px-4 text-left">Nome</th>
                            <th className="py-3 px-4 text-left">Categoria</th>
                            <th className="py-3 px-4 text-left">Preço</th>
                            <th className="py-3 px-4 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-blue-gray-900">
                        {filteredData.map((product, index) => (
                            <tr key={index} className="border-b border-blue-gray-200">
                                <td className="py-3 px-4">{product.name}</td>
                                <td className="py-3 px-4">{product.category}</td>
                                <td className="py-3 px-4">{product.price}</td>
                                <td className="py-3 px-4">
                                    <button
                                        className="text-black-600 hover:text-black-800"
                                        aria-label="Editar"
                                        onClick={() => handleModal(product)}
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                        className="ml-3 text-black-600 hover:text-black-800"
                                        aria-label="Deletar"
                                        onClick={() => handleDeleteModal(product)}
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ModalComponent isVisible={isModalVisible} onClose={handleCloseModal} product={selectedProduct} />
                <DeleteModal
                    isVisible={isModalDeleteVisible}
                    onClose={handleCloseDeleteModal}
                    product={selectedProduct}
                />
            </div>
        </div>
    );
};

export default TableComponent;