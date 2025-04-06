import React, { useState } from 'react';
import { apiCall } from '../../../common/request';

const AddProductForm = () => {
    const [formData, setFormData] = useState({ name: '', price: 0 });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiCall('POST', '/product', formData);
            alert('Product added successfully!');
        } catch (error) {
            console.error('Failed to add product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProductForm;
