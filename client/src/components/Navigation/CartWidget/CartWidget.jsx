import Button from "react-bootstrap/Button";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

const CartWidget = () => {
  const { cartQuantity } = useCart()

  return (
    <Link to={"/cart"}>
      <Button variant="dark" style={{ position: "relative" }}>
        <MdOutlineShoppingCart size={20} />
        {cartQuantity > 0 ? (
          <div
            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
            style={{ color: "white", width: "1.5rem", height: "1.5rem", position: "absolute", top: "-0.5rem", right: "-0.5rem"}}
          >
            {cartQuantity}
          </div>
        ) : null}
      </Button>
    </Link>
  );
};

export default CartWidget;
