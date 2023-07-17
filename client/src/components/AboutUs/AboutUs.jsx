import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AboutUs = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md="auto">
            <Card>
            <Card.Img variant="top" src="https://i.imgur.com/ZAOzV16.jpeg" height="500" className="img-fluid"/>
                <Card.Body>
                    <p className="text-center">Identificando las carencias que los negocios de tecnología tienen y las necesidades que los consumidores requieren nació P11 como respuesta a estas demandas. 
                    El objetivo es brindar atención de calidad  brindando un excelente asesoramiento en cada producto ofrecido en el negocio.</p>
                    <h2 className='text-center p-2'>Misión</h2>
                    <p className='text-center'>Brindar a los clientes un asesoramiento pertinente a sus necesidades mediante un trato amable y respetuoso.</p>
                    <h2 className='text-center p-2'>Visión</h2>
                    <p className='text-center'>Lograr la mayor variedad en informática, conectividad y accesorios de Córdoba.</p>
                    <h2 className='text-center p-2'>Valores</h2>
                    <p className='text-center'>El azul es el color de la compañía. Representa inteligencia, sabiduría y entendimiento, valores que P11 quiere transmitir. El espíritu de la empresa va en dirección de la ciencia, la tecnología y la innovación.</p>
                </Card.Body>
            </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AboutUs