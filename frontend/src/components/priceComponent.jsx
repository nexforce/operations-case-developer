import { useState } from 'react';
import PropTypes from 'prop-types';

const PriceFilterComponent = ({ onFilter }) => {
    const [maxPrice, setMaxPrice] = useState('');

    const handleChange = (e) => {
        setMaxPrice(e.target.value);
    };

    const handleFilter = () => {
        onFilter(maxPrice);
    };

    return (
        <div className="relative inline-block text-left">
            <input
                className='inline-flex text-sm justify-center rounded-md border border-gray-300 ml-6 bg-white px-2 py-1 font-medium text-black shadow-sm'
                type="number"
                value={maxPrice}
                onChange={handleChange}
                placeholder="Digite um preço máximo"
            />
            <button className="ml-3 marker:inline-flex text-sm justify-center rounded-md border border-gray-300 bg-white px-2 py-1 font-medium text-black shadow-sm" onClick={handleFilter}>Filter</button>
        </div>
    );
};

PriceFilterComponent.propTypes = {
    onFilter: PropTypes.func
};

export default PriceFilterComponent;