import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { fetchOrders, fetchStates, fetchClient } from "../../services/Order";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { createAlert } from "../../utils/alerts";

const History = () => {
  const statesData = useQuery(["states"], fetchStates, {
    staleTime: 6000,
  });

  const Estados = statesData.data;

  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState(null);

  const handleInputChange = (e) => {
    setDni(e.target.value);
  };

  const handleInputChangePass = (e) => {
    setPassword(e.target.value);
  };

  const search = async () => {
    setOrders(null);
    try {
      await fetchClient(dni, password);
      const data = await fetchOrders(dni);
      setOrders(data);
    } catch (error) {
      createAlert("error", "Error", error.response.data.error)
    }
  };

  const findStateName = (id) => {
    return Estados?.find((item) => item.id === id)?.nombre || "Sin estado";
  };

  return (
    <Container fluid="sm">
      <h1 className="text-center my-5">Mis Pedidos</h1>
      <div className="d-flex justify-content-center align-items-center">
        <label className="form-label align-items-center">
          <h3 className="mt-3">DNI:</h3>
        </label>
        <input
          className="form-control m-5"
          type="number"
          id="dni"
          onChange={handleInputChange}
        />
        <label className="form-label align-items-center">
          <h3 className="mt-3">CONTRASEÑA:</h3>
        </label>
        <input
          className="form-control m-5"
          type="password"
          id="password"
          onChange={handleInputChangePass}
        />
        {dni != "" && password != "" ? (
          <Button className="form-control m-5" onClick={search}>
            Buscar
          </Button>
        ) : (
          <Button className="form-control m-5" onClick={search} disabled>
            Buscar
          </Button>
        )}
      </div>
      {orders?.length > 0 ? (
        <Stack gap={5}>
          {orders.map((item) => (
            <div key={item.id}>
              <h3>Orden N° {item.id}</h3>
              <h4>Productos:</h4>
              <ul>
                {item.productos.map((producto, i) => (
                  <li key={i}>
                    {producto.nombre} | Cantidad: {producto.cantidad} | Precio
                    (unidad): ${producto.precio}
                  </li>
                ))}
              </ul>
              <h4>Fecha: {format(new Date(item.createdAt), "MM/dd/yyyy")}</h4>
              <h4>Total: ${item.montoTotal}</h4>
              <h4>Estado: {findStateName(item.estado)}</h4>
            </div>
          ))}
        </Stack>
      ) : (
        <Row className="justify-content-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/011/537/914/non_2x/history-file-empty-state-single-isolated-icon-with-outline-style-free-vector.jpg"
            style={{ width: "25%" }}
            alt="historial-vacio"
          />
          <h3>
            Tu historial esta vacio, una vez que realices pedidos podras verlos
            aqui
          </h3>
        </Row>
      )}
    </Container>
  );
};

export default History;
