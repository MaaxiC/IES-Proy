import axios from "axios";

export const fetchQuantitySales = async () => {
    const { data } = await axios.get('http://localhost:4000/api/ordenes/quantitySales');
    return data;
};

export const fetchAmountSales = async () => {
    const { data } = await axios.get('http://localhost:4000/api/ordenes/amountSales');
    return data;
};