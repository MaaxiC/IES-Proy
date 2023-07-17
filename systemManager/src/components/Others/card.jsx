
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './styles.css'

const Item = (Option) => {
  const { title, image, link } = Option;

  return (
    <Card className='p-3 m-3 text-center card-product nav-link bg-dark text-light' style={{ width: '18rem', height: '23rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)' }} as={Link} to={link}>
        <Card.Img variant="top" src={image} height="250px" style={{ objectFit: "cover"}}/>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
        </Card.Body>
    </Card>
  );
}

export default Item;
