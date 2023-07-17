import {
  fetchProducts,
  fetchBrands,
  fetchCategories,
  deleteProduct,
} from "../../services/products";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Container, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { ProductModal } from "../modals/productModal";
import { StockModal } from "../modals/adjustStockModal";
import { EditProductModal } from "../modals/editProductModal";

export function ConsultProduct() {
  const categoriesData = useQuery(["categories"], fetchCategories, {
    staleTime: 6000,
  });

  const brandsData = useQuery(["brands"], fetchBrands, {
    staleTime: 6000,
  });

  const Categorias = categoriesData.data;
  const Marcas = brandsData.data;

  const findCategory = (id) => {
    return (
      Categorias?.find((item) => item.id === id)?.nombre || "Sin categoria"
    );
  };

  const findBrand = (id) => {
    return Marcas?.find((item) => item.id === id)?.nombre || "Sin marca";
  };

  const [modalCreateShow, setModalCreateShow] = React.useState(false);
  const [modalUpdateShow, setModalUpdateShow] = React.useState(false);
  const [modalEditShow, setModalEditShow] = React.useState(false);

  const [productoelegido, setProductoElegido] = React.useState('');
  const [tituloProducto, setTitulo] = React.useState('');
  const [descripcionProducto, setDescripcionProducto] = React.useState('');
  const [codigoProducto, setCodigoProducto] = React.useState('');
  const [fotoProducto, setFotoProducto] = React.useState('');
  const [precioProducto, setPrecioProducto] = React.useState('');
  const [marcaProducto, setMarcaProducto] = React.useState('');
  const [categoriaProducto, setCategoriaProducto] = React.useState('');

  const { data, isLoading, refetch } = useQuery(["products"], fetchProducts, {
    staleTime: 0,
  });
  const Productos = data;

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
    await refetch();
    window.location.reload();
  };

  if (isLoading) return "Cargando...";

  return (
    <>
      <Container className="align-center my-4">
        <Container className="d-md-flex my-4 justify-content-end">
          <Button
            className="btn btn-success"
            variant=""
            style={{ marginLeft: "10px", marginRight: "10px" }}
            onClick={() => setModalCreateShow(true)}
          >
            Agregar nuevo producto
          </Button>
        </Container>
        <Table bordered hover variant="light">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Codigo</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Stock Comprometido</th>
              <th>Marca</th>
              <th>Categoria</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Productos.map((producto, index) => (
              <tr key={producto.id}>
                <td>{index + 1}</td>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.codigo}</td>
                <td>{producto.precio}</td>
                <td>{producto.stock}</td>
                <td>{producto.stockComprometido}</td>
                <td>{findBrand(producto.marca)}</td>
                <td>{findCategory(producto.categoria)}</td>
                <td>
                  <Container className="d-md-flex justify-content-center">
                  <Button
                      className="btn btn-primary"
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        setModalEditShow(true);
                        setProductoElegido(producto.id);
                        setTitulo(producto.nombre);
                        setDescripcionProducto(producto.descripcion);
                        setCodigoProducto(producto.codigo);
                        setFotoProducto(producto.foto);
                        setPrecioProducto(producto.precio);
                        setMarcaProducto(producto.marca);
                        setCategoriaProducto(producto.categoria);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      className="btn btn-warning"
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        setProductoElegido(producto.id);
                        setModalUpdateShow(true);
                        setTitulo(producto.nombre);
                      }}
                    >
                      Ajustar
                    </Button>
                    <Button
                      className="btn btn-danger"
                      variant=""
                      style={{ marginLeft: "10px" }}
                      onClick={() => handleDeleteProduct(producto.id)}
                    >
                      Eliminar
                    </Button>
                  </Container>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <ProductModal
        show={modalCreateShow}
        onHide={() => setModalCreateShow(false)}
      />
      <StockModal
        show={modalUpdateShow}
        onHide={() => setModalUpdateShow(false)}
        selectedProduct={productoelegido}
        titulo={tituloProducto}
      />
      <EditProductModal
        show={modalEditShow}
        onHide={() => setModalEditShow(false)}
        productId={productoelegido}
        tituloProd={tituloProducto}
        descripcionProd={descripcionProducto}
        codigoProd={codigoProducto}
        fotoProd={fotoProducto}
        precioProd={precioProducto}
        marcaProd={marcaProducto}
        categoriaProd={categoriaProducto}                
      />
    </>
  );
}