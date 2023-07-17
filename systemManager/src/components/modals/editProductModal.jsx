import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  updateProduct,
  fetchBrands,
  fetchCategories,
} from "../../services/products";
import { useQuery } from "@tanstack/react-query";

export function EditProductModal(props) {
  const [name, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery(
    ["categories"],
    fetchCategories,
    {
      staleTime: 6000,
    }
  );
  const Categorias = categoriesData;

  const { data: brandsData, isLoading: brandsLoading } = useQuery(
    ["brands"],
    fetchBrands,
    { staleTime: 6000 }
  );

  const marcas = brandsData;

  const {tituloProd, descripcionProd, codigoProd, fotoProd, precioProd, categoriaProd, marcaProd, productId, ...others } = props;

  useEffect(() => {
    setProduct(tituloProd);
    setDescription(descripcionProd);
    setCode(codigoProd);
    setPhoto(fotoProd);
    setPrice(precioProd);
    setCategory(categoriaProd);
    setBrand(marcaProd);
  }, [tituloProd, descripcionProd, codigoProd, fotoProd, precioProd, categoriaProd, marcaProd]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      name === "" ||
      description === "" ||
      code === "" ||
      photo === "" ||
      price === "" ||
      brand === "" ||
      category === ""
    ) {
      alert("Todos los campos deben estar completos");
      return;
    } else {
      try {
        await updateProduct(productId, {
          nombre: name,
          descripcion: description,
          codigo: code,
          foto: photo,
          precio: price,
          categoria: category,
          marca: brand,
        });
        others.onHide();
        window.location.replace("/e-commerce/consultProduct");
      } catch (error) {
        alert(error.response.data.error);
      }
    }
  };

  if (categoriesLoading || brandsLoading) return "Loading...";

  return (
    <>
      <Modal
        className="bg-primary bg-opacity-25"
        backdrop="static"
        {...others}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {tituloProd}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="card container " onSubmit={handleSubmit}>
            <div className="row mt-2"></div>
            <Form.Group className="mb-1" controlId="formBasicNumber">
              <Form.Label>Nombre de producto</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="Escribe el nombre..."
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicNumber">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escribe la descripción..."
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicNumber">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="value"
                placeholder="Escribe el código..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicNumber">
              <Form.Label>Foto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese link de imagen"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicNumber">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Escribe el precio..."
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicNumber">
              <Form.Label>Marca</Form.Label>
              <Form.Select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option disabled value="">
                  Elegir marca
                </option>
                {marcas.map((marca) => (
                  <option name="marca" value={marca.id} key={marca.id}>
                    {marca.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicNumber">
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option disabled value="">
                  Elegir categoria
                </option>
                {Categorias.map((categoria) => (
                  <option
                    name="categoria"
                    value={categoria.id}
                    key={categoria.id}
                  >
                    {categoria.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="success my-3" type="submit">
              Actualizar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger" onClick={others.onHide}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
