import { deleteProducts } from "../utils/apiService.js";
import PropTypes from 'prop-types';

const DeleteModal = ({isVisible, onClose, product}) => {
    const handleSubmit= async (e) => {
        e.preventDefault();
        try {
            await deleteProducts(product._id);
            onClose();
        } catch (err) {
            console.error('Failed to delete product', err);
        }
    };

    if (!isVisible) {
        return null;
    }

    return (
         <div className="py-12 transition duration-150 ease-in-out z-10 absolute top-20 right-0 bottom-0 left-0 w-full overflow-screen antialiased font-medium text-gray-800 bg-white-0 bg-white">
            <div className="max-w-sm p-2 mx-auto bg-white border-[1px] border-gray-200 shadow-md rounded hover:shadow-lg transition-all duration-150 ease-linear">
                    <div className="relative p-6">
                        <h1 className="text-3xl text-black font-bold">Deletar produto</h1>
                        <p className="text-sm mt-4 text-black-500">Você tem certeza que deseja deletar esse produto do sistema?</p>
                        <div className="flex flex-row mt-6 space-x-2 justify-evenly">
                            <button className="w-full py-2 text-sm font-medium text-center text-white transition duration-150 ease-linear bg-red-600 border border-red-600 rounded-lg hover:bg-red-500" onClick={handleSubmit}>Confirmar</button>
                            <button className="w-full py-2 text-sm text-center text-gray-500 transition duration-150 ease-linear bg-white border border-gray-200 rounded-lg hover:bg-gray-100" onClick={onClose}>Cancelar</button>
                        </div>
                    </div>
            </div>
        </div>
    );
};

DeleteModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    product: PropTypes.shape({ _id: PropTypes.string.isRequired })
};

export default DeleteModal;