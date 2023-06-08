import { fetchProducts } from "../../services/Products";
import { useQuery } from "@tanstack/react-query";
import Item from "../Item/Item";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from 'react-bootstrap/Spinner';

const ItemList = () => {
  const { data, isLoading, isError } = useQuery(
    ["products"],
    fetchProducts,
    { staleTime: 60000 }
  );

  if (isLoading) return <div className="d-flex justify-content-center mt-5"><Spinner animation="border" variant="primary" /></div>;

  if (isError) return <div className="d-flex justify-content-center mt-5"><h4>Error al obtener los productos</h4></div>;

  return (
    <Container>
      <Row
        className="g-3 justify-content-center"
        xs={1}
        md={2}
        lg={3}
        xxl={4}
      >
        {data
          ? data.map((data) => <Item product={data} key={data.id} />)
          : null}
      </Row>
    </Container>
  );
};

export default ItemList;
