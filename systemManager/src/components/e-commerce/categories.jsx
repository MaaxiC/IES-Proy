import { fetchCategories, deleteCategory } from "../../services/products";
import { useQuery } from "@tanstack/react-query";
import { Container, Table } from "react-bootstrap";
import { CategoryModal } from "../modals/categoryModal";
import { Button } from "react-bootstrap";
import React from "react";

export function Category() {
  const [modalShow, setModalShow] = React.useState(false);

  const { data, isLoading, refetch } = useQuery(
    ["categories"],
    fetchCategories,
    {
      staleTime: 6000,
    }
  );
  const Categorias = data;

  if (isLoading) return "Cargando...";

  return (
    <>
      <Container className="align-center my-4">
        <Container className="d-flex my-2 justify-content-end">
          <Button
            className="btn btn-success"
            onClick={() => setModalShow(true)}
          >
            Agregar una nueva categoría
          </Button>
        </Container>
        <br />
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
            {Categorias.map((categoria, index) => (
              <tr key={categoria.id}>
                <td>{index + 1}</td>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>
                  {/* <Button className="btn btn-primary">Editar</Button> */}
                  <Button
                    className="btn btn-danger"
                    onClick={async() => {
                      deleteCategory(categoria.id)
                      await refetch()
                      window.location.reload()
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
      <CategoryModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
