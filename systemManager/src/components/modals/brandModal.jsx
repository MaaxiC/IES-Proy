import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import React, { useState } from "react";
import { addBrand } from "../../services/products";

export function BrandModal(props) {
  const [brand, setBrand] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addBrand({ nombre: brand });
    props.onHide();
    window.location.reload();
  };
  return (
    <>
      <Modal
        className="bg-success bg-opacity-25"
        backdrop="static"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Agregar nueva marca
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="card container " onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicNumber">
              <Form.Label className="mt-2">Nombre de marca</Form.Label>
              <Form.Control
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Escribe el nombre..."
              />
            </Form.Group>
            <Button className="my-3" variant="success" type="submit">
              Añadir
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger" onClick={props.onHide}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
