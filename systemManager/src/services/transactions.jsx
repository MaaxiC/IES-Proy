import axios from 'axios';

export const fetchTransactions = async () => {
    const { data } = await axios.get('http://localhost:4000/api/transacciones');
    return data;
};