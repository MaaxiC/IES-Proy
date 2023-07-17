import { fetchBrands, deleteBrand } from "../../services/products";
import { useQuery } from "@tanstack/react-query";
import { Container, Table } from "react-bootstrap";
import { BrandModal } from "../modals/brandModal";
import { Button } from "react-bootstrap";
import React from "react";

export function Brand() {
  const [modalShow, setModalShow] = React.useState(false);

  const { data, isLoading, refetch } = useQuery(["brands"], fetchBrands, {
    staleTime: 6000,
  });

  const Marcas = data;

  if (isLoading) return "Cargando...";

  return (
    <>
      <Container className="align-center my-4">
        <Container className="d-flex my-4 justify-content-end">
          <Button
            className="btn btn-success"
            onClick={() => setModalShow(true)}
          >
            Agregar una nueva marca
          </Button>
        </Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Marcas.map((marca, index) => (
              <tr key={marca.id}>
                <td>{index + 1}</td>
                <td>{marca.id}</td>
                <td>{marca.nombre}</td>
                <td>
                  {/* <Button className="btn btn-primary">Editar</Button> */}
                  <Button
                    className="btn btn-danger"
                    onClick={async () => {
                      deleteBrand(marca.id);
                      await refetch();
                      window.location.reload();
                    }}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <BrandModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
