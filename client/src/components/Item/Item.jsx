import './Item.css';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const Item = ({product}) => {
  const { nombre, foto, precio, id } = product;

  return (
    <Card className='p-3 m-3 text-center card-product nav-link' style={{ width: '18rem', height: '23rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)' }} as={Link} to={`/item/${id}`}>
        <Card.Img variant="top" src={foto} height="250px" style={{ objectFit: "cover"}}/>
        <Card.Body>
            <Card.Title>{nombre}</Card.Title>
            <Card.Title className='p-3 text-muted'>${precio}</Card.Title>
        </Card.Body>
    </Card>
  );
}

export default Item;