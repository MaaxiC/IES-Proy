import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useCart } from "../../context/CartContext";
import Stack from "react-bootstrap/Stack";
import CartItem from "./CartItem";
import Button from "react-bootstrap/Button";
import { fetchProducts } from "../../services/Products";
import { useQuery } from "@tanstack/react-query";
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";
import Modal from "../ModalForm/ModalForm";
import { useState } from "react";
import BuyerForm from "../Forms/BuyerForm";

const Cart = () => {
  const { cartQuantity, cartItems, isError } = useCart();
  const [show, setShow] = useState(false);

  const { data, isLoading } = useQuery(["products"], fetchProducts, {
    staleTime: 60000,
  });

  if (isLoading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (isError)
    return (
      <div className="d-flex justify-content-center mt-5">
        <h4>Error al obtener el carrito</h4>
      </div>
    );

  return (
    <Container fluid="sm">
      {cartQuantity > 0 ? (
        <>
          <h1 className="text-center my-5">Carrito de productos</h1>
          <Stack gap={5}>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </Stack>
          <hr />
          <h4 className="mt-4 text-end">
            Total $
            {cartItems.reduce((total, cartItems) => {
              const item = data?.find((product) => product.id === cartItems.id);
              return total + (item?.precio || 0) * cartItems.quantity;
            }, 0)}
          </h4>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="outline-info" className="mt-2 mx-3" as={Link} to={'/'}>
              Continuar Comprando
            </Button>
            <Button variant="info" className="mt-2" onClick={() => setShow(true)}>
              Comprar
            </Button>
            <Modal handleClose={() => setShow(false)} show={show}>
              <BuyerForm />
            </Modal>
          </div>
        </>
      ) : (
        <Row className="justify-content-center">
          <img
            src="https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png"
            style={{ width: "70%" }}
            alt="carrito-vacio"
          />
          <h3>
            Tu carrito esta vacio, una vez que agregues productos podras verlos
            aqui
          </h3>
        </Row>
      )}
    </Container>
  );
};

export default Cart;
