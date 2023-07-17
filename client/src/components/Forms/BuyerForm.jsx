import Button from "react-bootstrap/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaSpinner } from "react-icons/fa";
import isEmailValidator from 'validator/lib/isEmail';
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../services/Order";
import { createAlertWithCallback } from "../../utils/alerts";
import { fetchProducts } from "../../services/Products";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../../context/CartContext";

const BuyerForm = () => {
  const { cartItems, clearCart } = useCart();

  const { data } = useQuery(["products"], fetchProducts, {
    staleTime: 60000,
  });

  const initialValue = {
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    check: false,
  };

  const isRequired = "Este campo es requerido";
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    nombre: Yup.string().required(isRequired),
    apellido: Yup.string().required(isRequired),
    dni: Yup.string().min(8, "DNI debe contener 8 caracteres").required(isRequired),
    email: Yup.string().required(isRequired).test("is-valid", "Email es invalido", (value) => value ? isEmailValidator(value) : new Yup.ValidationError("Valor invalido")),
    check: Yup.boolean().oneOf(
      [true],
      "Debe aceptar los terminos y condiciones"
    ),
  });

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={
        async ({nombre, apellido, dni, email}) => {
          const order = {
            nombre,
            apellido,
            dni,
            email,
            productos: cartItems.map(item => {
              const products = data?.find(product => product.id === item.id);
              products.cantidad = item.quantity;
              return products
            }),
            montoTotal: cartItems.reduce((total, cartItems) => {
              const item = data?.find(product => product.id === cartItems.id);
              return total + (item?.precio || 0) * cartItems.quantity;
            }, 0),
            tipoTransaccion: "Venta",
            estado: "649750c5588fe6631b228e18",
          };
          await createOrder(order);
          createAlertWithCallback("success", "Pedido realizado con exito", "Acercate al local para finalizar el pago y poder retirar el producto! Recibira la informacion del pedido por mail.", () => { 
            clearCart() 
            navigate("/")
          });
        }
      }
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <Field
                type="text"
                className="form-control mb-3"
                name="nombre"
                placeholder="Nombre"
          />
          <ErrorMessage
                component="p"
                className="text-danger text-sm"
                name="nombre"
          />
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <Field
                type="text"
                className="form-control mb-3"
                name="apellido"
                placeholder="Apellido"
          />
          <ErrorMessage
                component="p"
                className="text-danger text-sm"
                name="apellido"
          />
          <label htmlFor="dni" className="form-label">DNI</label>
          <Field
                type="number"
                className="form-control mb-3"
                name="dni"
                placeholder="DNI"
          />
          <ErrorMessage
                component="p"
                className="text-danger text-sm"
                name="dni"
          />
          <label htmlFor="email" className="form-label">Email</label>
          <Field
                type="email"
                className="form-control mb-3"
                name="email"
                placeholder="Email"
          />
          <ErrorMessage
                component="p"
                className="text-danger text-sm"
                name="email"
          />
          <Field
                type="checkbox"
                className="form-check-input mb-3"
                name="check"
                id="flexCheckDefault"
          />
          <label className="form-check-label ms-2" htmlFor="check">
            Acepto los terminos y politicas de compra
          </label>
          <ErrorMessage
                component="p"
                className="text-danger text-sm"
                name="check"
          />
          <Button
            className="w-100"
            variant="info"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <FaSpinner className="animate-spin h-5 w-5" /> : 'Finalizar compra'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default BuyerForm;
