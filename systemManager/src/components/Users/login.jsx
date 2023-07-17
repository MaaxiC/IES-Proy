import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { loginUser } from "../../services/users";
import Alert from "react-bootstrap/Alert";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginUser({ usuario: username, password });
      localStorage.setItem("user", JSON.stringify(user.payload));
      window.location.replace("/e-commerce/dashboard");
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <>
      <Form
        className="card container h-100 col-md-3 mt-5 bg-dark text-light"
        onSubmit={handleSubmit}
      >
        <div className="row mt-2">
          <img
            src="images/p11banner.jpg"
            width="750"
            height="188"
            className="d-inline-block align-center"
            alt="P11 Tecnología Banner"
            title="P11 Tecnología"
          />
          <h3 className="mt-3 align-content-center">Bienvenido de nuevo</h3>
        </div>
        <Form.Group className="mb-1" controlId="formBasicNumber">
          <Form.Label>Código de usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresar código de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <br />
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Clave</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresar clave"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Acceder
        </Button>
        {errorMessage && (
          <Alert variant="danger" className="mt-2">
            {errorMessage}
          </Alert>
        )}
        <br />
      </Form>
    </>
  );
}