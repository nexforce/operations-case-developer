import { useEffect, useState } from 'react';
import { getProducts, postProducts, deleteProducts, updateProducts } from '../utils/apiService';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import ModalComponent from './modalComponent';
import DeleteModal from './deleteComponent';

const TableComponent = () => {
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const getData = async () => {
        try {
            const response = await getProducts();
            const products = response.hardware || [];
            if (Array.isArray(products)) {
                setData(products);
            } else {
                console.error('Missing or invalid hardware data', products);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleModal = (product = null) => {
        setSelectedProduct(product);
        setIsModalVisible(true);
    };

    const handleCloseModal = async (updatedProduct) => {
        if (updatedProduct) {
            if (selectedProduct) {
                await updateProducts(updatedProduct, selectedProduct._id);
            } else {
                await postProducts(updatedProduct);
            }
        }
        setIsModalVisible(false);
        setSelectedProduct(null);
        getData();
    };

    const handleDeleteModal = (id) => {
        setSelectedProduct(id);
        setIsModalDeleteVisible(true);
    };

    const handleCloseDeleteModal = async () => {
        if (selectedProduct) {
            await deleteProducts(selectedProduct);
        }
        setIsModalDeleteVisible(false);
        setSelectedProduct(null);
        getData();
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="overflow-x-auto">
                <button
                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-700 transition duration-150 ease-in-out hover:bg-green-600 bg-black rounded text-white px-3 py-1 text-sm"
                    onClick={() => handleModal(null)}
                >
                    +
                </button>
                <table className="min-w-full bg-white shadow-md rounded-xl mt-4">
                    <thead>
                        <tr className="bg-blue-gray-100 text-gray-700">
                            <th className="py-3 px-4 text-left">Nome</th>
                            <th className="py-3 px-4 text-left">Categoria</th>
                            <th className="py-3 px-4 text-left">Preço</th>
                            <th className="py-3 px-4 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-blue-gray-900">
                        {data.map((product, index) => (
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
                                        onClick={() => handleDeleteModal(product._id)}
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
                    productId={selectedProduct}
                />
            </div>
        </div>
    );
};

export default TableComponent;