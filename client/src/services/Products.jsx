import axios from 'axios';

export const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:4000/api/productos');
    return data;
};

export const fetchOneProduct = async (id) => {
    const { data } = await axios.get(`http://localhost:4000/api/productos/${id}`);
    return data;
};

export const fetchCategories = async () => {
    const { data } = await axios.get('http://localhost:4000/api/categorias');
    return data;
};