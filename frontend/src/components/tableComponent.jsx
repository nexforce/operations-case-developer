import { useState } from 'react';

const TableComponent = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');

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
                        <tr className="border-b border-blue-gray-200">
                        <td className="py-3 px-4">Company A</td>
                        <td className="py-3 px-4">$50.25</td>
                        <td className="py-3 px-4">100</td>
                        <td className="py-3 px-4">
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Editar </a>
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Deletar</a>
                        </td>
                        </tr>
                        <tr className="border-b border-blue-gray-200">
                        <td className="py-3 px-4">Company B</td>
                        <td className="py-3 px-4">$75.60</td>
                        <td className="py-3 px-4">150</td>
                        <td className="py-3 px-4">
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Editar </a>
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Deletar</a>
                        </td>
                        </tr>
                        <tr className="border-b border-blue-gray-200">
                        <td className="py-3 px-4">Company C</td>
                        <td className="py-3 px-4">$30.80</td>
                        <td className="py-3 px-4">200</td>
                        <td className="py-3 px-4">
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Editar </a>
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Deletar</a>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableComponent;