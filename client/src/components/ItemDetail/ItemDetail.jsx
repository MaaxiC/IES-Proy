import { fetchOneProduct } from "../../services/Products";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import './ItemDetail.css'
import Button from 'react-bootstrap/Button';
import { useCart } from "../../context/CartContext";
import { AiOutlineMinus } from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const ItemDetail = () => {
  const { itemId } = useParams();
  const [qty, setQty] = useState(1);
  
  const navigate = useNavigate();

  const { getItemQuantity, increaseCartQuantity } = useCart()

  const quantity = getItemQuantity(itemId)

  const { data, isLoading, isError } = useQuery(
    ["product", itemId],
    () => fetchOneProduct(itemId),
    {
      staleTime: 60000,
    }
  );

  if (isLoading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (isError)
    return (
      <div className="d-flex justify-content-center mt-5">
        <h4>Error al obtener el producto</h4>
      </div>
    );

  const minusItem = () => {
    if (qty > 1) setQty(qty - 1)
  }

  const plusItem = async () => {
    if ((data.stock - data.stockComprometido) > (quantity + qty)) setQty(qty + 1)
  }

  const addToCart = () => {
    if ((data.stock - data.stockComprometido) >= (quantity + qty)) {
      increaseCartQuantity(itemId, qty)
      navigate('/cart')
    } 
  }

  return (
    <Container>
        <Card
            className="m-5 text-center h-100"
            style={{
                boxShadow: "0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)",
            }}
        >
            <div className="details">
                <div className="big-img">
                    <img src={data.foto} alt="foto"/>
                </div>
                <div className="box">
                    <Row>
                        <h2>{data.nombre}</h2>
                        <span>${data.precio}</span>
                    </Row>
                    <p>{data.descripcion}</p>
                    {(data.stock - data.stockComprometido) > (quantity + qty) ? <p>Stock extra disponible: {(data.stock - data.stockComprometido) - (quantity + qty)}</p> : <p style={{ color: "red" }}>Sin Stock</p>}
                    <div className="d-flex align-items-baseline mb-3">
                      <p className="fs-4 mx-4">Cantidad: </p>
                      <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
                        <Button className="rounded-circle" variant="outline-info" size="sm" style={{ border: "none", height: "55px" }} onClick={minusItem}><AiOutlineMinus size={25}/></Button>
                        <span className="fs-4 mx-2">{qty}</span>
                        <Button className="rounded-circle" variant="outline-info" size="sm" style={{ border: "none", height: "55px" }} onClick={plusItem}><AiOutlinePlus size={25}/></Button>
                      </div>
                    </div>
                    {(data.stock - data.stockComprometido) > (quantity + qty - 1) ? <Button variant="info" className="w-100" onClick={addToCart}>Agregar al carrito</Button> : <Button variant="info" className="w-100" disabled>Agregar al carrito</Button>}
                </div>
            </div>
        </Card>
    </Container>
  );
};

export default ItemDetail;
