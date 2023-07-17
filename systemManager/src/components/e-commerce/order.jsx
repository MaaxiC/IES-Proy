import { fetchOrders, fetchStates, updateOrder } from "../../services/orders";
import { useQuery } from "@tanstack/react-query";
import { Form, Table } from "react-bootstrap";
import { Container, Button } from "react-bootstrap";
import { useState } from "react";

export function Order() {
  const { data } = useQuery(["orders"], fetchOrders, {
    staleTime: 6000,
  });
  const Ordenes = data;

  const stateData = useQuery(["states"], fetchStates, {
    staleTime: 6000,
  });

  const [arrayEstado, setArrayEstado] = useState();

  const Estados = stateData.data;

  const handleChange = (event) => {
    if (arrayEstado === undefined) {
      setArrayEstado([{ id: event.target.id, value: event.target.value }]);
    } else if (arrayEstado.find((element) => element.id === event.target.id)) {
      arrayEstado.find((element) => element.id === event.target.id).value =
        event.target.value;
    } else {
      setArrayEstado([
        ...arrayEstado,
        { id: event.target.id, value: event.target.value },
      ]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (arrayEstado !== undefined) {
      try {
        arrayEstado.forEach(async (element) => {
          await updateOrder(element.id, { estado: element.value });
        });
        alert("Ordenes actualizadas correctamente");
        setArrayEstado(undefined)
      } catch (error) {
        alert(error.response.data.error);
      }
    }
  };

  return Estados ? (
    <>
      <br />
      <Container className="align-center mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Dni</th>
              <th>Email</th>
              <th>Monto Total</th>
              <th>Tipo de transacción</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {Ordenes?.map((orden, index) => (
              <tr key={orden.id}>
                <td>{index + 1}</td>
                <td>{orden.nombre}</td>
                <td>{orden.apellido}</td>
                <td>{orden.dni}</td>
                <td>{orden.email}</td>
                <td>{orden.montoTotal}</td>
                <td>{orden.tipoTransaccion}</td>
                <td>
                  <Form.Select
                    id={orden.id}
                    defaultValue={orden.estado}
                    className="bg-light"
                    onChange={handleChange}
                  >
                    {Estados.map((estado, idx) => {
                      if (orden.estado === '64975148588fe6631b228e20' || orden.estado === '64975094588fe6631b228e14') {
                        return (
                          <option id={idx} key={idx} value={estado.id} disabled>
                            {estado.nombre}
                          </option>
                        );
                      } else {
                        return (
                          <option id={idx} key={idx} value={estado.id}>
                            {estado.nombre}
                          </option>
                        );
                      }
                    })}
                  </Form.Select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Container className="d-flex my-4 justify-content-end">
          {arrayEstado ? (
            <Button
              className="btn btn-success"
              onClick={(e) => handleSubmit(e)}
            >
              Actualizar estado
            </Button>
          ) : (
            <Button
              className="btn btn-success disabled"
              onClick={(e) => handleSubmit(e)}
            >
              Actualizar estado
            </Button>
          )}
        </Container>
      </Container>
    </>
  ) : (
    <>Cargando...</>
  );
}
