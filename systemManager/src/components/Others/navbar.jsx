import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import "./styles.css";
import { Link } from "react-router-dom";

export function NavBar() {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.replace("/");
  };
  return (
    <Navbar
      expand="lg"
      sticky="top"
      variant="dark"
      className="md-6 gradient-custom text-body-primary"
    >
      <Container fluid>
        <Link to={"/"} />
        <Navbar.Brand href="/e-commerce/dashboard">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgsgT3ZuoK5tyrXU4f4F6-rWntY3ouZ-cjkS7B2ELHpwNQ0t671vKjTHJ7Yu62AsixFdg&usqp=CAU"
            width="30"
            height="30"
            className="d-inline-block align-center"
            alt="P11 Tecnología"
          />
        </Navbar.Brand>
        <Navbar.Brand href="/e-commerce/dashboard">P11 TECNOLOGÍA</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
            placement="center"
          >
            <LinkContainer to="/e-commerce/dashboard">
              <Nav.Link>Inicio</Nav.Link>
            </LinkContainer>

            <Nav.Link href="/e-commerce/consultProduct">Productos</Nav.Link>

            <NavDropdown title="Marcas y Categorías" id="basic-nav-dropdown">
              <NavDropdown.Item href="/e-commerce/brands">
                Ver Marcas
              </NavDropdown.Item>
              <NavDropdown.Item href="/e-commerce/categories">
                Ver Categorias
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/e-commerce/order">Órdenes</Nav.Link>
            <Nav.Link href="/e-commerce/transaction">Transacciones</Nav.Link>
            <Nav.Link href="/Others/chartTest">Métricas</Nav.Link>
            <Nav.Link href="/e-commerce/about">Acerca de...</Nav.Link>
            <Nav.Link className="text-warning" onClick={logout}>
              Cerrar sesión
            </Nav.Link>
          </Nav>
          <Form className="d-flex"></Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
