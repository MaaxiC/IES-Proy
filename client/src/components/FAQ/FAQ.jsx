import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const FAQ = () => {
  return (
    <Container>
        <Row className="justify-content-center mt-4 text-center">
            <Col>
                <img className="img-fluid" style={{width: "30%"}} src="https://static.vecteezy.com/system/resources/previews/010/042/806/original/faq-icon-with-grey-color-faq-illustration-isolated-in-white-background-frequently-asked-question-logo-best-used-for-mobile-applications-and-web-design-free-vector.jpg" alt="FAQ" />
            </Col>
        </Row>
        <Row className="justify-content-center mt-5">
            <Col>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>¿Se puede reservar un producto en particular?</Accordion.Header>
                        <Accordion.Body>
                            Se tomarán reservas solo de aquellos productos que estén en stock, esto es así ya que no podemos garantizar que un producto que no está en stock vuelva a ingresar, ni el precio que tendrá.
                            Las reservas duran 48hs y se toman una vez que el producto haya sido abonado en su totalidad.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>¿Que metodos de pago estan disponibles?</Accordion.Header>
                        <Accordion.Body>
                        Se puede abonar con efectivo, transferencia bancaria, MercadoPago y tarjetas de credito (con interes del 10%) en el local.
                        A traves de la pagina web el pago se realiza a travez de sistema de MercadoPago.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>¿Realizan envios o tengo que pasar a retirar mi compra?</Accordion.Header>
                        <Accordion.Body>
                        Actualmente no estamos realizando envios pero esperaramos poder hacerlo en el futuro. Podes pasar a retirarlo por nuestro local en Deán Funes 41 (Córdoba).
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>¿Como gestiono un cambio por garantia o una devolución del pago?</Accordion.Header>
                        <Accordion.Body>
                        Comunicate con nosotros a traves de nuestro mail de contacto o por nuestras redes sociales para coordinar el cambio o la devolución. Podes ver la informacion de contacto en la seccion "Contacto".
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Col>
        </Row>
    </Container>
  )
}

export default FAQ