import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export function NewUser() {
  return (
    <Form className="card container  h-100 col-md-3 mt-5">
      <div className="row mt-2">
        <img
          src="../images/p11banner.jpg"
          width="750"
          height="188"
          className="d-inline-block align-center"
          alt="P11 Tecnología Banner"
          title="P11 Tecnología"
        />
        <h3 className="mt-3 align-content-center">Alta de nuevo usuario</h3>
      </div>

      <Form.Group className="mb-1" controlId="formBasicNumber">
        <Form.Label>Apellidos</Form.Label>
        <Form.Control type="value" placeholder="Ingresar apellidos" />
      </Form.Group>

      <Form.Group className="mb-1" controlId="formBasicNumber">
        <Form.Label>Nombres</Form.Label>
        <Form.Control type="value" placeholder="Ingresar nombres" />
      </Form.Group>

      <Form.Group className="mb-1" controlId="formBasicNumber">
        <Form.Label>Código de usuario</Form.Label>
        <Form.Control type="value" placeholder="Ingresar código de usuario" />
        <Form.Text className="text-muted">Sólo números</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Clave</Form.Label>
        <Form.Control type="password" placeholder="Ingresar clave" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>

      <Form.Group className="mb-1" controlId="formBasicNumber">
        <DropdownButton id="dropdown-basic-button" title="Admin">
          <Dropdown.Item href="#/action-1">Empleado A</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Empleado B</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Empleado C</Dropdown.Item>
        </DropdownButton>
      </Form.Group>
      <br />
      <Button variant="primary" type="submit">
        Registrar
      </Button>
      <div className="row mt-2"></div>
    </Form>
  );
}
