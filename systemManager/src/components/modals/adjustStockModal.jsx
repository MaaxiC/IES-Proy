import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import React, { useState } from "react";
import { updateStock } from "../../services/products";

export function StockModal(props) {
  const [stock, setStock] = useState(0);

  const {selectedProduct, titulo, ...others } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (stock === "") {
      alert("Todos los campos deben estar completos");
      return;
    } else {
      try {
        await updateStock(selectedProduct,{stock: parseInt(stock)});
        others.onHide();
        window.location.reload();
      } catch (error) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      <Modal
      className="bg-warning bg-opacity-25"
        backdrop="static"
        {...others}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="card container " onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicNumber">
              <Form.Label className="mt-2">Ajuste de Stock - {titulo}</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setStock(e.target.value)}
                placeholder="Ingrese el valor..."
              />
            </Form.Group>
            <Button className="my-3" variant="success" type="submit">
              Añadir
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger" onClick={others.onHide}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
