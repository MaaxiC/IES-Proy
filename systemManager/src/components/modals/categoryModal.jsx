import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { addCategory } from "../../services/products";

export function CategoryModal(props) {
  const [category, setCategory] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addCategory({ nombre: category });
    props.onHide();
    window.location.replace("/e-commerce/categories");
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
            Agregar nueva categoría
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="card container " onSubmit={handleSubmit}>
            <Form.Group className="my-2" controlId="formBasicNumber">
              <Form.Label>Nombre de categoría</Form.Label>
              <Form.Control
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
