import axios from 'axios';

axios.defaults.withCredentials = true;

export const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:4000/api/productos');
    return data;
};

export const addProduct = async (product) => {
    const { data } = await axios.post('http://localhost:4000/api/productos', product);
    return data;
};

export const fetchOneProduct = async (id) => {
    const { data } = await axios.get(`http://localhost:4000/api/productos/${id}`);
    return data;
};

export const deleteProduct = async (id) => {
    const { data } = await axios.delete(`http://localhost:4000/api/productos/${id}`);
    return data;
};

export const updateStock = async (id, stock) => {
    const { data } = await axios.put(`http://localhost:4000/api/productos/${id}/stock`, stock);
    return data;
};

export const updateProduct = async (id, product) => {
    const { data } = await axios.put(`http://localhost:4000/api/productos/${id}`, product);
    return data;
};

export const deleteCategory = async (id) => {
    const { data } = await axios.delete(`http://localhost:4000/api/categorias/${id}`);
    return data;
};

export const deleteBrand = async (id) => {
    const { data } = await axios.delete(`http://localhost:4000/api/marcas/${id}`);
    return data;
};

export const fetchCategories = async () => {
    const { data } = await axios.get('http://localhost:4000/api/categorias');
    return data;
};

export const addCategory = async (categoria) => {
    const { data } = await axios.post('http://localhost:4000/api/categorias', categoria);
    return data;
};

export const fetchBrands = async () => {
    const { data } = await axios.get('http://localhost:4000/api/marcas');
    return data;
};

export const addBrand = async (marca) => {
    const { data } = await axios.post('http://localhost:4000/api/marcas', marca);
    return data;
};

