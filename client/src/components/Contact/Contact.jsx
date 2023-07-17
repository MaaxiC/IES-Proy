import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardGroup from 'react-bootstrap/CardGroup';

const Contact = () => {
  return (
    <Container fluid="lg">
        <Row className="justify-content-center mt-5 text-center">
            <Col md="auto">
                <h2>Horarios de atencion:</h2>
            </Col>
        </Row>  
        <Row className="justify-content-center mt-2 text-center">
            <Col md="auto">
                <h4>Lunes a viernes de 8 a 18hs</h4>
            </Col>
        </Row>              
      <Row>
        <Col>
            <CardGroup className="p-4 mt-3">
                <Card className='align-items-center text-center border-0'>
                    <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/640px-WhatsApp.svg.png" style={{width: "50%", position: "center"}}/>
                    <Card.Body>
                    <Card.Title>WhatsApp</Card.Title>
                    <Card.Text>
                        +54 0 351 1234567
                    </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='align-items-center text-center border-0'>
                    <Card.Img variant="top" src="https://images.vexels.com/media/users/3/140965/isolated/preview/a945eef28564ae85fff5ac18adf637d9-icono-de-telefono-redondo.png" style={{width: "50%", position: "center"}}/>
                    <Card.Body>
                    <Card.Title>Telefono</Card.Title>
                    <Card.Text>
                        +54 0 351 4271234
                    </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='align-items-center text-center p-2 border-0'>
                    <Card.Img variant="top" src="https://icons.iconarchive.com/icons/hamzasaleem/stock/512/Mail-icon.png" style={{width: "50%", position: "center"}}/>
                    <Card.Body>
                    <Card.Title>Mail</Card.Title>
                    <Card.Text>
                        p11@gmail.com
                    </Card.Text>
                    </Card.Body>
                </Card>
            </CardGroup>
        </Col>
      </Row>
    </Container>
    
  )
}

export default Contact