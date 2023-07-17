import { fetchProducts } from "../../services/Products";
import { useQuery } from "@tanstack/react-query";
import Stack from "react-bootstrap/Stack";
import { useCart } from "../../context/CartContext";
import Button from "react-bootstrap/Button";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { TbTrashX } from "react-icons/tb";

const CartItem = ({ id, quantity }) => {
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useCart();

  const { data } = useQuery(["products"], fetchProducts, {
    staleTime: 60000,
  });

  const item = data?.find((item) => item.id === id);

  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={3} className="d-flex align-items-center">
      <div className="col d-none d-md-block">
        <img
          src={item.foto}
          alt="foto"
          style={{ width: "125px", height: "100px", objectFit: "cover" }}
        />
      </div>
      <div className="col">
        <h5>{item.nombre}</h5>
        <h5 className="text-muted">${item.precio}</h5>
      </div>
      <div className="col">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ gap: ".5rem" }}
        >
          <Button
            className="rounded-circle"
            variant="outline-info"
            size="sm"
            style={{ border: "none", height: "55px" }}
            onClick={() => decreaseCartQuantity(item.id)}
            disabled={quantity === 1}
          >
            <AiOutlineMinus size={25} />
          </Button>
          <span className="fs-4 mx-2">{quantity}</span>
          <Button
            className="rounded-circle"
            variant="outline-info"
            size="sm"
            style={{ border: "none", height: "55px" }}
            onClick={() => increaseCartQuantity(item.id, 1)}
            disabled={quantity === (item.stock - item.stockComprometido)}
          >
            <AiOutlinePlus size={25} />
          </Button>
        </div>
      </div>
      <div className="col">
        <h4 className="text-center">${quantity * item.precio}</h4>
      </div>
      <Button
        className="mx-auto rounded-circle"
        variant="outline-danger"
        size="sm"
        style={{ border: "none", height: "55px" }}
        onClick={() => removeFromCart(item.id)}
      >
        <TbTrashX size={30} />
      </Button>
    </Stack>
  );
};

export default CartItem;
