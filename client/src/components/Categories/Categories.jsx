import { fetchProducts, fetchCategories } from "../../services/Products";
import { useQuery } from "@tanstack/react-query";
import Item from "../Item/Item";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";

const Categories = () => {
  const { category } = useParams();

  const { data, isLoading, isError } = useQuery(["products"], fetchProducts, {
    staleTime: 60000,
  });

  const categories = useQuery(["categories"], fetchCategories, {
    staleTime: 60000,
  });

  const categoryValue = categories.data?.map((c) => {
    if (c.id === category) return c.nombre;
  });

  const filterProductByCategory = data?.filter(
    (product) => product.categoria === category
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
        <h4>Error al obtener los productos</h4>
      </div>
    );

  return (
    <Container>
      <Row className="p-2 justify-content-center mt-5">
        {filterProductByCategory.length > 0 ? (
          <>
            <h4 className="my-3 text-center">{categoryValue}</h4>
            {filterProductByCategory.map((data, idx) => (
              <Item product={data} key={idx} />
            ))}
          </>
        ) : (
          <h4 className="mt-5 text-center">
            No existen productos para la categoria seleccionada
          </h4>
        )}
      </Row>
    </Container>
  );
};

export default Categories;
