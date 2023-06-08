import axios from "axios";

export const createOrder = async (order) => {
  const { data } = await axios.post(
    "http://localhost:4000/api/ordenes",
    order,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};
