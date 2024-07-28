import { useEffect, useState } from 'react';
import { getProducts } from '../utils/apiService';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const TableComponent = () => {
    const [data, setData] = useState([]);

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

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-xl">
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
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                        className="text-black-600 hover:text-black-800"
                                        aria-label="Deletar"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableComponent;