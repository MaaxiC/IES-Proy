import axios from 'axios';

export const fetchOrders = async () => {
    const { data } = await axios.get('http://localhost:4000/api/ordenes');
    return data;
};

export const updateOrder = async (id, order) => {
    const { data } = await axios.put(`http://localhost:4000/api/ordenes/${id}`, order);
    return data;
};

export const fetchStates = async () => {
    const { data } = await axios.get('http://localhost:4000/api/estados');
    return data;
};