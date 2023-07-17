import axios from "axios";

export const fetchUsers = async () => {
  const { data } = await axios.get("http://localhost:4000/api/usuarios");
  return data;
};

export const loginUser = async (user) => {
  const { data } = await axios.post(
    "http://localhost:4000/auth/api/iniciarsesion",
    user
  );
  return data;
};
