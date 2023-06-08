import Carousel from '../components/Carousel/Carousel'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ItemList from '../components/ItemList/ItemList';
import CarouselBrands from '../components/Carousel/CarouselBrands';

const HomePage = () => {
  return (
    <Container fluid>
      <Row className="bg-primary mb-5">
        <Carousel/>
      </Row>
      <h1 className='text-center my-4'>Novedades</h1>
      <ItemList/>
      <h1 className='text-center my-4 d-none d-lg-block'>Nuestras Marcas</h1>
      <CarouselBrands/>
    </Container>
  )
}

export default HomePage