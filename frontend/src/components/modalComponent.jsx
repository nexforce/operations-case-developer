import { useState } from "react";
import { postProducts } from "../utils/apiService";
import PropTypes from 'prop-types';

const ModalComponent = ({isVisible, onClose}) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async () => {
        try {
            const productData = { name, category, price };
            await postProducts(productData);
            onClose();
        } catch (err) {
            console.error('Failed to post product', err);
        }
    };
    
    if (!isVisible) return null;

    return (
        <dh-component>
            <div className="py-12 transition duration-150 ease-in-out z-10 absolute top-20 right-0 bottom-0 left-0" id="modal">
                <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Adicionar novo produto</h1>
                        <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Nome</label>
                        <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-green-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Nome" onChange={(e) => setName(e.target.value)}/>
                        <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Categoria</label>
                        <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-green-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Categoria" onChange={(e) => setCategory(e.target.value)}/>
                        <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Preço</label>
                        <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-green-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Preço" onChange={(e) => setPrice(e.target.value)}/>
                        <div className="flex items-center justify-start w-full">
                            <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-700 transition duration-150 ease-in-out hover:bg-green-600 bg-black rounded text-white px-8 py-2 text-sm" onClick={handleSubmit}>Confirmar</button>
                            <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 ease-in-out hover:border-red-400 hover:bg-red-600 border rounded px-8 py-2 text-sm text-black hover:text-white" onClick={onClose}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </dh-component>
    )
};

ModalComponent.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ModalComponent;